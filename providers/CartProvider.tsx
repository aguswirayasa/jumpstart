"use client";

import React from "react";
import { CartProvider } from "use-shopping-cart";
import { useHydration } from "@/hooks/useHydration";
interface ProvidersProps {
  children: React.ReactNode;
}

const CartProviders = ({ children }: ProvidersProps) => {
  const isMounted = useHydration();

  if (!isMounted) {
    return null;
  }
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
      currency={"USD"}
      shouldPersist={true}
      persistKey="local"
    >
      {children}
    </CartProvider>
  );
};

export default CartProviders;
