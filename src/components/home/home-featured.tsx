import { useGetThreeCard } from "@/hooks/useGetThreeCard";
import FeaturedSkeletons from "./skeletons/featured-skeletons";
import { useNavigate } from "@tanstack/react-router";
interface HomeFeaturedProps {
  _id: any;
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}
export function HomeFeatured() {
  const navigate = useNavigate();
  const {
    data: threeCardBoards,
    isLoading,
    isError,
    error,
  } = useGetThreeCard();
  
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
  if (!threeCardBoards?.data || threeCardBoards.data.length === 0) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-yellow-900/20 border border-yellow-500/50 p-8 rounded">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                No featured games available
              </h3>
              <p className="text-yellow-300">
                Check back later for new featured games!
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
            <div key={game._id} className="group cursor-target">
              <div
                onClick={() => navigate({ to: `/games/${game._id}` })}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/50 p-6 transition-all hover:border-purple-400 hover:bg-black/60"
              >
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
                <div 
                  className="text-purple-300 mb-4 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">
                    ${game.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
