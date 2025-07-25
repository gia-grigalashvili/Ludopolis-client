interface SearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function Search({ searchTerm, onSearchChange }: SearchProps) {
  return (
    <div className="mb-6  w-full md:w-1/2">
      <input
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border border-purple-400 rounded-lg bg-[#1f1f2b] text-white placeholder-purple-300 focus:outline-none focus:border-purple-600 transition"
      />
    </div>
  );
}
