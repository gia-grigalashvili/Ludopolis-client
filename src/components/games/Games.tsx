import { useState } from "react";
import Filter from "./filter";
import AllGames from "./AllGames";
import { Header } from "../header";
import { Footer } from "../footer";
import Search from "./Search";

export default function Games() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <Header />
      <div className="flex flex-col md:flex-row md:pl-80">
        <Filter onFilterChange={setSelectedCategories} />
        <div className="flex-1 p-4">
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
