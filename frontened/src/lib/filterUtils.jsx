import { DEFAULT_FILTERS } from "./constants";

//---  Apply filters to products array ---\\
export const applyFilters = (products, filters) => {
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

  // RATING
  if (
    filters.rating.min !== DEFAULT_FILTERS.rating.min ||
    filters.rating.max !== DEFAULT_FILTERS.rating.max
  ) {
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


export function filtersToSearchParams(filters) {
  const params = {};
  console.log(DEFAULT_FILTERS);

  if (filters.search) params.search = filters.search;

  if (filters.category !== DEFAULT_FILTERS.category)
    params.category = filters.category;

  if (filters.price.min !== DEFAULT_FILTERS.price.min)
    params.minPrice = filters.price.min;

  if (filters.price.max !== DEFAULT_FILTERS.price.max)
    params.maxPrice = filters.price.max;

  if (filters.rating.min !== DEFAULT_FILTERS.rating.min)
    params.minRating = filters.rating.min;
  if (filters.rating.max !== DEFAULT_FILTERS.rating.max)
    params.maxrating = filters.rating.max;

  if (filters.inStockOnly) params.inStock = "1";

  if (filters.sort !== DEFAULT_FILTERS.sort) params.sort = filters.sort;

  return params;
}

export function searchParamsToFilters(searchParams) {
  function convertToNumber(param, defaultValue) {
    const value = searchParams.get(param);
    if (value === null) return defaultValue;
    const num = Number(value);
    return isNaN(num) ? defaultValue : value;
  }

  return {
    ...DEFAULT_FILTERS,
    search: searchParams.get("search") || DEFAULT_FILTERS.search,
    category: searchParams.get("category") || DEFAULT_FILTERS.category,
    price: {
      min: convertToNumber("minPrice", DEFAULT_FILTERS.price.min),
      max: convertToNumber("maxPrice", DEFAULT_FILTERS.price.max),
    },
    rating: {
      min: convertToNumber("minRating", DEFAULT_FILTERS.rating.min),
      max: convertToNumber("maxPrice", DEFAULT_FILTERS.rating.max),
    },
    isStockOnly:
      searchParams.get("inStock") || DEFAULT_FILTERS.inStockOnly >= 1,
    sort: searchParams.get("sort") || DEFAULT_FILTERS.sort,
  };
}
