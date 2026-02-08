import { useState, createContext, useEffect, useContext } from "react";
import { BASE_URL } from "../lib/constants";

export const ProductContext = createContext(null);

export function ProductProvider({children}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try{
setLoading(true);
        const res = await fetch(BASE_URL + "/products");
        if(!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      }catch(err){
        setError(err.message || "Unknown error");
      }finally{
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{products, loading, error}}>
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
