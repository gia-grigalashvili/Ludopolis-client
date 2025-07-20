export function HomeHero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
          RETRO BOARD GAMES
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-purple-200 max-w-2xl mx-auto">
          Discover classic cardboard adventures from the golden age of gaming
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 border-2 border-white font-bold text-lg transition-all transform hover:scale-105">
            SHOP NOW
          </button>
          <button className="px-8 py-4 border-2 border-purple-400 hover:bg-purple-400/20 font-bold text-lg transition-all">
            VIEW CATALOG
          </button>
        </div>
      </div>
    </section>
  );
}
