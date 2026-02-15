import { BASE_URL } from "../lib/constants";

export default function fetchProducts(queryParams) {
  const queryString = new URLSearchParams(queryParams);

  const response = fetch(BASE_URL / params);

  if (!response.ok) {
    throw new Error("Sorry! Could not fetch Data.");
  }

  return response.json();
}
