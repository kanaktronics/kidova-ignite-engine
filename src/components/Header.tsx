import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, LogIn, LogOut, User, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg gradient-primary" />
            <span className="text-xl font-bold tracking-tight">
              Kidova<span className="text-primary">Labs</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="/#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="/#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Our Story
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="hidden sm:flex"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="hidden sm:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="/#products"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </a>
                <a
                  href="/#categories"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </a>
                <a
                  href="/#about"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Story
                </a>
                <div className="border-t pt-4 mt-4">
                  {user ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
