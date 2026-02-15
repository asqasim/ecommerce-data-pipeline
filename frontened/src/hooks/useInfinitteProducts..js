import { useCallback, useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../lib/constants";
import { SCROLLY_END_DISTANCE } from "../lib/constants";

export function useInfiniteProducts(filteredProdcuts) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = displayedProducts.length < filteredProdcuts.length;

  useEffect(() => {
    setDisplayedProducts(filteredProdcuts.slice(0, ITEMS_PER_PAGE));
  }, [filteredProdcuts]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    const nextBatch = filteredProdcuts.slice(
      displayedProducts.length,
      displayedProducts.length + ITEMS_PER_PAGE,
    );

    requestAnimationFrame(() => {
      setDisplayedProducts((prev) => [...prev, ...nextBatch]);
      setIsLoadingMore(false);
    });
  }, [isLoadingMore, hasMore, filteredProdcuts, displayedProducts.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.screenY <=
        document.body.offsetHeight - SCROLLY_END_DISTANCE
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return {
    displayedProducts,
    hasMore,
    isLoadingMore,
  };
}
