-- Allow users to create their own orders
CREATE POLICY "Users can create own orders"
ON public.orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own orders (needed for payment status updates)
CREATE POLICY "Users can update own orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id);

-- Allow authenticated users to insert order items
CREATE POLICY "Users can create order items"
ON public.order_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);