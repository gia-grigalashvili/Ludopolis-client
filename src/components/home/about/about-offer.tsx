export default function AboutOffer() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ★ WHAT WE OFFER ★
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 text-center cursor-target hover:border-purple-400 hover:bg-black/60 transition-all">
            <div className="w-16 h-16 bg-purple-600 border-2 border-white mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              🎲
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-100">
              Classic Games
            </h3>
            <p className="text-purple-300 text-sm">
              Timeless board games that have stood the test of time, carefully
              selected for quality and entertainment value.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 text-center cursor-target hover:border-purple-400 hover:bg-black/60 transition-all">
            <div className="w-16 h-16 bg-purple-600 border-2 border-white mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              👨‍👩‍👧‍👦
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-100">
              Family Fun
            </h3>
            <p className="text-purple-300 text-sm">
              Games designed to bring families together, creating lasting
              memories and strengthening bonds through shared experiences.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 text-center cursor-target hover:border-purple-400 hover:bg-black/60 transition-all">
            <div className="w-16 h-16 bg-purple-600 border-2 border-white mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              🏆
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-100">
              Premium Quality
            </h3>
            <p className="text-purple-300 text-sm">
              Only the finest materials and craftsmanship, ensuring your games
              will provide years of enjoyment and entertainment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
