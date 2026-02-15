import { useMemo ,useState,useEffect} from "react";
import Product from "../components/Products/Product";
import { useDebounce } from "../hooks/useDebounce";
import Error from "../components/ui/error";
import ProductsSkeleton from "../components/Products/ProductsSkeleton";

import { useStoreFilters } from "../hooks/useStroeFilters";
import { useProductsQuery } from "../hooks/useProductQuery";

export default function Store() {
  const { filters, updateFilters, resetFilters, isDefaultFilters } =
  useStoreFilters();
  const debouncedSearch = useDebounce(filters.search, 300);
  const [page, setPage] = useState(1);
  
  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );
  const { data : products , loading, error,hasMore, total } = useProductsQuery(effectiveFilters, page);

  const displayedProducts = products;

 
useEffect(() => {
  setPage(1);
}, [filters]);
  /* ---------------- UI ---------------- */
  return (
    <div>
      <div className="flex gap-2">
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
      <input
  type="text"
  value={filters.search}
  placeholder="Search Products"
  onChange={(event) =>
    updateFilters((prev) => ({
      ...prev,
      search: event.currentTarget.value,
    }))
  }
/>

      </div>
      
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

      {/* {isLoadingMore && <ProductsSkeleton />} */}
      {!hasMore && !loading && <p className="text-neutral-500 font-medium text-sm uppercase  leading-tight tracking-tight text-center my-8">No more products</p>}
    </div>
  );
}
