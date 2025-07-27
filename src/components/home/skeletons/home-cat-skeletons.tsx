

export  function HomeCatSkeletons() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ◆ GAME CATEGORIES ◆
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="group cursor-pointer cursor-target">
              <div className="bg-black/30 backdrop-blur-sm border-2 border-purple-500/50 p-6 text-center transition-all">
                <div className="flex justify-center mb-3">
                  <div className="w-8 h-8 bg-purple-300/20 rounded animate-pulse"></div>
                </div>
                <div className="h-5 bg-purple-300/20 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
