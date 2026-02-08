import { useState, createContext, useEffect, useContext } from "react";
import { Base_URL } from "../lib/constants";

export const ProductContext = createContext(null);

export function ProductProvider({children}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(Base_URL + "/products");
      const data = await res.json();
      setProducts(data.products);
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{products}}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error("useProducts must be use inside ProductProvider");

  return context;
}
