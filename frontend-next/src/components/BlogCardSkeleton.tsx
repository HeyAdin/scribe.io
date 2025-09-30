export function BlogCardSkeleton() {
  return (
    <div className="w-full mt-4 p-4 flex flex-col gap-4 animate-pulse">
      {/* Author row */}
      <div className="flex gap-5 items-center">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-200" />
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>

      {/* Title placeholder */}
      <div className="h-10 w-[80%] bg-gray-200 rounded" />

      {/* Content lines */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-[90%] bg-gray-200 rounded" />
        <div className="h-4 w-[70%] bg-gray-200 rounded" />
      </div>

      {/* Footer row */}
      <div className="flex gap-4 items-center w-full mt-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
