import { useMemo } from "react";
import { useProducts } from "../context/ProductContext";
import { applyFilters } from "../lib/filterUtils";
import Product from "../components/Products/Product";
import { useDebounce } from "../hooks/useDebounce";
import Error from "../components/ui/error";
import ProductsSkeleton from "../components/Products/ProductsSkeleton";

import { useStoreFilters } from "../hooks/useStroeFilters";
import { useInfiniteProducts } from "../hooks/useInfinitteProducts.";

export default function Store() {
  const { products, loading, error } = useProducts();
  const { filters, updateFilters, resetFilters, isDefaultFilters } =
    useStoreFilters();
  const debouncedSearch = useDebounce(filters.search, 300);


  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const filteredProducts = useMemo(
    () => applyFilters(products, effectiveFilters),
    [products, effectiveFilters],
  );

  const { displayedProducts, hasMore, isLoadingMore } =
    useInfiniteProducts(filteredProducts);

 

  /* ---------------- UI ---------------- */
  return (
    <div>
      <button onClick={resetFilters} disabled={isDefaultFilters}>
        Reset Filters
      </button>

      <button
        onClick={() =>
          updateFilters((prev) => ({
            ...prev,
            category: "Books",
          }))
        }>
        Category : Books
      </button>
      <button
        onClick={() =>
          updateFilters((prev) => ({
            ...prev,
            price: { ...prev.price, min: 1200 },
          }))
        }>
        Over Thousand
      </button>

      {loading ? (
        <ProductsSkeleton />
      ) : error ? (
        <Error />
      ) : displayedProducts.length === 0 ? (
        <>
          <p>No products available</p>
          <button className="bg-green-600!" onClick={resetFilters}>
            Reset Filters
          </button>
        </>
      ) : (
        displayedProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))
      )}

      {isLoadingMore && <ProductsSkeleton />}
      {!hasMore && <p>No more products</p>}
    </div>
  );
}
