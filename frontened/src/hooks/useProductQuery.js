import { useState, useEffect } from "react";
import fetchProducts from "../services/productApi";

export function useProductsQuery(filters, page, limit = 12) {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchProducts({ ...filters, page, limit });

        if (!ignore) {
          setData((prev) =>
            page === 1 ? response.data : [...prev, ...response.data],
          );
          setTotal(response.total);
          setHasMore(response.hasMore);
        }
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [filters, page, limit]);

  return { data, total, hasMore, loading, error };

}
