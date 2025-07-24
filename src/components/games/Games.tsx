// Games.tsx
import { useState } from "react";
import Filter from "./Filter";
import AllGames from "./AllGames";

export default function Games() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      <Filter onFilterChange={setSelectedCategories} />
      <div className="flex-1 p-4">
        <AllGames selectedCategories={selectedCategories} />
      </div>
    </div>
  );
}
