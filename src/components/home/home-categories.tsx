import { UseGetCategories } from "@/hooks/UseGetCategories";
import { Gamepad2, Dice1, Users, Trophy } from "lucide-react";
import { HomeCatSkeletons } from "./skeletons/home-cat-skeletons";
import { Link } from "@tanstack/react-router";

interface Category {
  id: string;
  name: string;
}

const staticIcons = [Gamepad2, Dice1, Users, Trophy];

export function HomeCategories() {
  const { data: categories, isLoading, isError, error } = UseGetCategories();
  
  if (isLoading) return <HomeCatSkeletons />;
  
  if (isError)
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
            ◆ GAME CATEGORIES ◆
          </h3>
          <div className="bg-red-900/20 backdrop-blur-sm border-2 border-red-500/50 p-8 text-center rounded-lg">
            <div className="text-red-400 mb-2">
              <Trophy className="w-8 h-8 mx-auto" />
            </div>
            <h4 className="text-xl font-bold text-red-300 mb-2">
              Error Loading Categories
            </h4>
            <p className="text-red-200">
              {error?.message || "Failed to load game categories"}
            </p>
          </div>
        </div>
      </section>
    );

  const categoriesArray = Array.isArray(categories) ? categories : [];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center text-purple-100">
          ◆ GAME CATEGORIES ◆
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesArray.map((category: Category, index: number) => {
            const IconComponent = staticIcons[index % 4];

            return (
              <Link
                key={`${category.id}-${index}`}
                to={`/games`}
                search={{ categories: [category.name] }} 
                className="group cursor-pointer cursor-target"
              >
                <div className="bg-black/30 backdrop-blur-sm border-2 border-purple-500/50 p-6 text-center transition-all hover:border-purple-400 hover:bg-purple-600/20">
                  <div className="flex justify-center mb-3">
                    <IconComponent className="w-8 h-8 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  </div>
                  <h4 className="font-bold text-purple-100">{category.name}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}