export function HomeFeatured() {
  const featuredGames = [
    {
      name: "SPACE CONQUEST",
      description:
        "Classic 80s strategy game with dice-based combat and galactic domination",
      price: "29.99",
      icon: "🚀",
    },
    {
      name: "DUNGEON MASTER",
      description:
        "Retro RPG adventure with modular board pieces and character progression",
      price: "39.99",
      icon: "⚔️",
    },
    {
      name: "NEON RACERS",
      description:
        "Fast-paced racing game with customizable vehicles and power-ups",
      price: "24.99",
      icon: "🏎️",
    },
  ];
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ★ FEATURED CLASSICS ★
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredGames.map((game, index) => (
            <div key={index} className="group">
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 transition-all hover:border-purple-400 hover:bg-black/60">
                <div className="aspect-square bg-gradient-to-br from-purple-900 to-purple-700 mb-4 border-2 border-white/30 flex items-center justify-center">
                  <span className="text-4xl font-black text-white">
                    {game.icon}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-purple-100">
                  {game.name}
                </h4>
                <p className="text-purple-300 mb-4 text-sm">
                  {game.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">
                    ${game.price}
                  </span>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 border border-white/50 text-sm font-bold transition-colors">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
