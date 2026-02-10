export default function ProductSkeleton() {
  return (
    <div className=" border-neutral-700 rounded-xl pb-6 border flex flex-col justify-center space-x-4 p-2">
      <div className="rounded-lg bg-neutral-700 w-full h-56 mb-4"></div>

      <div className="flex flex-col gap-2 m-0 px-1.5">
        <div className="flex gap-2 justify-between">
          <div className="w-3/4 h-6 rounded-sm bg-neutral-700"></div>
          <div className="min-w-6 min-h-6 rounded-full bg-neutral-700"></div>
        </div>
        <div className="flex gap-2 ">
          <div className="flex-2 h-6 rounded-sm bg-neutral-700"></div>
          <div className="flex-1 h-6 rounded-sm bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}
