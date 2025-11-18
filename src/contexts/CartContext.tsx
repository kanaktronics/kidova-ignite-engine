import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    primary_image_url: string;
    sale_price: number | null;
    base_price: number;
    slug: string;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        product_id,
        quantity,
        product:products(name, primary_image_url, sale_price, base_price, slug)
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
    } else {
      setItems(data as CartItem[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity,
      }, {
        onConflict: "user_id,product_id",
      });

    if (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } else {
      toast.success("Added to cart!");
      fetchCart();
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
    } else {
      toast.success("Removed from cart");
      fetchCart();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId);

    if (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } else {
      fetchCart();
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } else {
      setItems([]);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.sale_price || item.product.base_price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};