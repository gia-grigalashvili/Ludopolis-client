import { useGetThreeCard } from "@/hooks/useGetThreeCard";
import FeaturedSkeletons from "./skeletons/featured-skeletons";

interface HomeFeaturedProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}
export function HomeFeatured() {
  const {
    data: threeCardBoards,
    isLoading,
    isError,
    error,
  } = useGetThreeCard();
  console.log(threeCardBoards);
  if (isLoading) {
    return <FeaturedSkeletons />;
  }
  if (isError) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-red-900/20 border border-red-500/50 p-8 rounded">
              <h3 className="text-xl font-bold text-red-400 mb-2">
                Failed to load featured games
              </h3>
              <p className="text-red-300">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ★ FEATURED CLASSICS ★
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {threeCardBoards.data.map((game: HomeFeaturedProps) => (
            <div key={game.id} className="group cursor-target">
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 transition-all hover:border-purple-400 hover:bg-black/60">
                <div className="aspect-square bg-gradient-to-br from-purple-900 to-purple-700 mb-4 border-2 border-white/30 flex items-center justify-center overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold mb-2 text-purple-100 line-clamp-1">
                  {game.name}
                </h4>
                <p className="text-sm text-purple-400 mb-2 font-medium">
                  {game.category}
                </p>
                <p className="text-purple-300 mb-4 text-sm line-clamp-2">
                  {game.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">
                    ${game.price}
                  </span>
                  <button className="cursor-target px-4 py-2 bg-purple-600 hover:bg-purple-700 border border-white/50 text-sm font-bold transition-colors">
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
