import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { Sweet } from '../types/index';

interface CartItem extends Sweet {
  cartQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (sweet: Sweet, quantity?: number) => void;
  removeFromCart: (sweetId: string) => void;
  updateQuantity: (sweetId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (sweet: Sweet, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === sweet.id);
      
      if (existingItem) {
        // Update quantity if item already in cart
        return prev.map((item) =>
          item.id === sweet.id
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + quantity, item.quantity) }
            : item
        );
      } else {
        // Add new item to cart
        return [...prev, { ...sweet, cartQuantity: Math.min(quantity, sweet.quantity) }];
      }
    });
  };

  const removeFromCart = (sweetId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== sweetId));
  };

  const updateQuantity = (sweetId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === sweetId
          ? { ...item, cartQuantity: Math.max(1, Math.min(quantity, item.quantity)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
