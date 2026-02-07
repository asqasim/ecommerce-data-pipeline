import { createContext, useState, useEffect, useContext } from "react";
import { Max_Products } from "../lib/constants";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  function addItem(id) {
    setCart(prevItems => {
      const exists = prevItems.find(item => item.id === id);

      if (exists) {
        return prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.min(item.quantity + 1, Max_Products) } // clamp to max
            : item
        );
      }

      return [...prevItems, { id, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setCart(prevItems => prevItems.filter(item => item.id !== id));
  }

  function resetCart(id) {
    setCart([]);
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1 || quantity > Max_Products) return;

    setCart(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    resetCart,
    totalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartContextProvider");
  }
  return context;
}
