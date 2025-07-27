import SplitText from "../ui/spllit-text";



export function HomeHero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <SplitText
            text="CARD BOARD GAMES"
            className="text-5xl md:text-7xl font-black text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
        <p className="text-xl md:text-2xl mb-8 text-purple-200 max-w-2xl mx-auto">
          Discover classic cardboard adventures from the golden age of gaming
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="cursor-target px-8 py-4 bg-purple-600 hover:bg-purple-700 border-2 border-white font-bold text-lg transition-all transform hover:scale-105">
            SHOP NOW
          </button>
          <button className="cursor-target px-8 py-4 border-2 border-purple-400 hover:bg-purple-400/20 font-bold text-lg transition-all">
            VIEW CATALOG
          </button>
        </div>
      </div>
    </section>
  );
}
