export default function GameCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-[#1f1f2b]/70 rounded-2xl backdrop-blur-sm border border-purple-500/50 p-5">
            <div className="aspect-square relative rounded-2xl overflow-hidden border-2 border-white/20 mb-4 bg-gray-700" />
            <div className="h-6 bg-gray-600 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-600 rounded w-1/2 mb-1" />
            <div className="h-4 bg-gray-600 rounded w-full mb-2" />
            <div className="h-4 bg-gray-600 rounded w-5/6 mb-4" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-600 rounded w-16" />
              <div className="h-8 bg-gray-700 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
