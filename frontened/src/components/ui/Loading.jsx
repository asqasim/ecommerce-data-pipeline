import { ITEMS_PER_PAGE } from "../../lib/constants";
import ProductSkeleton from "./ProdcutSkeleton";

export default function Loading() {
  const productsSkeleton = Array.from({ length: ITEMS_PER_PAGE }).map(
    (_, i) => <ProductSkeleton key={i} />,
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsSkeleton}
    </div>
  );
}
