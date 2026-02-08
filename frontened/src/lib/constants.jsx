export const BASE_URL = "http://localhost:5000/api";
export const MAX_PRODUCTS = 20;
export const ITEMS_PER_PAGE = 5;
export const SCROLLY_END_DISTANCE = 100;

export const DEFAULT_FILTERS = {
  search: "",
  category: "all",
  price: {
    min: 0,
    max: Infinity,
  },
  rating: {
    min: 0,
    max: 5,
  },
  inStockOnly: false,
  sort: "default",
}