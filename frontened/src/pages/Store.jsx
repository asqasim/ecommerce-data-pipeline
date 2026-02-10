import { useEffect, useMemo, useState, useCallback } from "react";
import { useProducts } from "../context/ProductContext";
import {
  ITEMS_PER_PAGE,
  SCROLLY_END_DISTANCE,
  DEFAULT_FILTERS,
} from "../lib/constants";
import Product from "../components/ui/Product";
import { useDebounce } from "../hooks/useDebounce";
import Error from "../components/ui/error";
import Loading from "../components/ui/Loading";

/* ---------------- FILTER ENGINE ---------------- */
const applyFilters = (products, filters) => {
  let result = [...products];

  // SEARCH
  if (filters.search.trim()) {
    const query = filters.search.toLowerCase().trim();
    result = result.filter((p) => p.name.toLowerCase().includes(query));
  }

  // CATEGORY
  if (filters.category !== "all") {
    result = result.filter((p) => p.category_name === filters.category);
  }

  // PRICE RANGE
  if (filters.price.min != null) {
    result = result.filter((p) => p.price >= filters.price.min);
  }
  if (filters.price.max != null) {
    result = result.filter((p) => p.price <= filters.price.max);
  }

  // RATING (future-proof)
  if (filters.rating.min !== 0 || filters.rating.max !== 5) {
    result = result.filter(
      (p) =>
        typeof p.rating === "number" &&
        p.rating >= filters.rating.min &&
        p.rating <= filters.rating.max,
    );
  }

  // IN STOCK
  if (filters.inStockOnly) {
    result = result.filter((p) => p.stock_quantity > 0);
  }

  // SORTING
  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return result;
};

export default function Store() {
  const { products, loading, error } = useProducts();

  /* ---------------- FILTER STATE ---------------- */
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });

  const debouncedSearch = useDebounce(filters.search, 300);
  const effectiveFilters = useMemo(() => {
    return {
      ...filters,
      search: debouncedSearch,
    };
  }, [filters, debouncedSearch]);

  function resetFilters() {
    setFilters({ ...DEFAULT_FILTERS });
    setPage(1);
  }

  function clearSearch() {
    setFilters((prev) => ({ ...prev, search: "" }));
  }

  /* ---------------- PAGINATION STATE ---------------- */
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  /* ---------------- FILTERED PRODUCTS ---------------- */
  const filteredProducts = useMemo(
    () => applyFilters(products, effectiveFilters),
    [products, effectiveFilters],
  );

  const hasMore = displayedProducts.length < filteredProducts.length;

  /* ---------------- RESET ON FILTER CHANGE ---------------- */
  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, [filteredProducts]);

  /* ---------------- LOAD MORE ---------------- */
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || filteredProducts.length === 0) return;

    setIsLoadingMore(true);

    const nextBatch = filteredProducts.slice(
      page * ITEMS_PER_PAGE,
      (page + 1) * ITEMS_PER_PAGE,
    );

    if (nextBatch.length === 0) {
      setIsLoadingMore(false);
      return;
    }

    setDisplayedProducts((prev) => [...prev, ...nextBatch]);
    setPage((prev) => prev + 1);
    setIsLoadingMore(false);
  }, [isLoadingMore, page, filteredProducts, hasMore]);

  /* ---------------- INFINITE SCROLL ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - SCROLLY_END_DISTANCE
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  /* ---------------- UI ---------------- */
  return (
    <div>
      <button
        onClick={resetFilters}
        disabled={JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS)}>
        Reset Filters
      </button>

      <button
        onClick={() => {
          setFilters((prev) => ({ ...prev, category: "Books" }));
        }}>
        Category : Books
      </button>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : products.length === 0 ? (
        <p>No products available</p>
      ) : (
        displayedProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))
      )}

     {isLoadingMore && <Loading />}

      {!hasMore && <p>No more products</p>}
    </div>
  );
}
