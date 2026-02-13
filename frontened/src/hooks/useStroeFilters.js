import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  filtersToSearchParams,
  searchParamsToFilters,
} from "../lib/filterUtils";
import { DEFAULT_FILTERS } from "../lib/constants";

export function useStoreFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return searchParamsToFilters(searchParams);
  }, [searchParams]);

  const updateFilters = useCallback(
    (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(filters) : updater;
      const params = filtersToSearchParams(newFilters);
      setSearchParams(params, { replace: true });
    },
    [filters, searchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  });

  const isDefaultFilters = useMemo(
    () =>
      Object.entries(DEFAULT_FILTERS).every(
        ([key, value]) =>
          JSON.stringify(filters[key]) === JSON.stringify(value),
      ),
    [filters],
  );

  return {
    filters,
    updateFilters,
    resetFilters,
    isDefaultFilters,
  };
}
