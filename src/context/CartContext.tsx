"use client";

import React, {
  createContext,
  useContext,
  useState,
   ReactNode,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: {
      id: number;
      name: string;
      price: number;
      thumbnail: string;
      stock: number;
    },
    quantity: number
  ) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    item: {
      id: number;
      name: string;
      price: number;
      thumbnail: string;
      stock: number;
    },
    quantity: number
  ) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const getTotalItems = () => cart.reduce((sum, i) => sum + i.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
