export function HomeCategories() {
  const categories = [
    { name: "Strategy", icon: "♟️", count: 24 },
    { name: "Adventure", icon: "🗡️", count: 18 },
    { name: "Family", icon: "👨‍👩‍👧‍👦", count: 32 },
    { name: "Racing", icon: "��", count: 12 },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ◆ GAME CATEGORIES ◆
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer cursor-target">
              <div className="bg-black/30 backdrop-blur-sm border-2 border-purple-500/50 p-6 text-center transition-all hover:border-purple-400 hover:bg-purple-600/20">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h4 className="font-bold text-purple-100">{category.name}</h4>
                <p className="text-sm text-purple-300 mt-1">
                  {category.count} games
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
