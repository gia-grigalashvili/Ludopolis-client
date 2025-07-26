export default function CarouselSkeelton() {
  return (
    <div className="min-w-0 w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="transition-all border border-neutral-600 bg-transparent backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-8 text-white">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              {/* Image Skeleton */}
              <div className="w-full lg:w-1/2 lg:max-w-[500px] aspect-square lg:aspect-[4/5] bg-gray-800 rounded-lg animate-pulse flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg"></div>
              </div>

              <div className="flex-1 min-w-0 w-full">
                {/* Title Skeleton */}
                <div className="h-8 sm:h-10 bg-gray-700 rounded-md mb-4 animate-pulse"></div>
                {/* Category Skeleton */}
                <div className="h-4 bg-gray-600 rounded-md mb-6 w-32 animate-pulse"></div>
                {/* Description Skeleton */}
                <div className="mb-6 space-y-3">
                  <div className="h-4 bg-gray-600 rounded-md animate-pulse"></div>
                  <div className="h-4 bg-gray-600 rounded-md w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-600 rounded-md w-3/5 animate-pulse"></div>
                </div>
                {/* Price Skeleton */}
                <div className="h-8 bg-gray-700 rounded-md mb-6 w-24 animate-pulse"></div>
                {/* Button Skeleton */}
                <div className="h-12 bg-purple-700 rounded-md w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="w-full px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-700 rounded-md mb-8 w-64 mx-auto animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-black/40 border border-purple-500/50 p-4 rounded-lg h-[320px] animate-pulse"
              >
                <div className="w-full h-44 bg-gradient-to-br from-gray-700 to-gray-600 mb-4 rounded-lg"></div>
                <div className="h-6 bg-gray-600 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-md mb-4 w-20"></div>
                <div className="h-6 bg-gray-600 rounded-md w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
