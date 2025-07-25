// Games.tsx
import { useState } from "react";
import Filter from "./Filter";
import AllGames from "./AllGames";

import { Header } from "../header";
import { Footer } from "../footer";
import Search from "./Search";
export default function Games() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {" "}
      <Header />
      <div className="flex flex-col md:flex-row gap-4 ">
        <Filter onFilterChange={setSelectedCategories} />
        <div className=" flex-1 p-4">
          <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <AllGames
            selectedCategories={selectedCategories}
            searchTerm={searchTerm}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
