import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { useProducts } from "../context/ProductContext";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { products } = useProducts();

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    setCart((prevCart) => {
      const newCart = prevCart.filter((item) =>
        products.some((product) => product.id === item.id),
      );
      return newCart.length === prevCart.length ? prevCart : newCart;
    });
  }, [products]);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addItem = useCallback(
    (id) => {
      setCart((prevItems) => {
        const target = prevItems.find((item) => item.id === id);

        if (target) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }

        return [...prevItems, { id: id, quantity: 1 }];
      });
    },
    [cart, products],
  );

  const decrementItem = useCallback(
    (id) => {
      setCart((prevItems) => {
        const target = prevItems.find((item) => item.id === id);

        if (!target) return prevItems;

        if (target.quantity === 1) {
          return prevItems.filter((item) => item.id !== id);
        }

        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      });
    },
    [cart],
  );

  const removeItem = useCallback(
    (id) => {
      setCart((prevItems) => prevItems.filter((item) => item.id !== id));
    },
    [cart],
  );

  return (
    <CartContext.Provider
      value={{ cart, addItem, totalQuantity, decrementItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
