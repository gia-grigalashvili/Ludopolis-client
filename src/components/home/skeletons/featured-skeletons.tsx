export default function FeaturedSkeletons() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ★ FEATURED CLASSICS ★
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="group cursor-target">
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 transition-all hover:border-purple-400 hover:bg-black/60">
                <div className="aspect-square bg-gradient-to-br from-purple-900 to-purple-700 mb-4 border-2 border-white/30 flex items-center justify-center overflow-hidden animate-pulse">
                  <div className="w-full h-full bg-purple-800/50"></div>
                </div>
                <div className="h-6 bg-purple-800/50 mb-2 animate-pulse rounded"></div>
                <div className="h-4 bg-purple-800/30 mb-2 w-20 animate-pulse rounded"></div>
                <div className="h-4 bg-purple-800/30 mb-4 animate-pulse rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 w-16 bg-purple-800/50 animate-pulse rounded"></div>
                  <div className="h-10 w-24 bg-purple-800/50 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
