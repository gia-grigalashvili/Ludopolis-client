export function Header() {
  return (
    <header className="p-6 border-b border-purple-500/30 backdrop-blur-sm bg-black/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-target">
          <div className="w-8 h-8 bg-purple-500 border-2 border-white transform rotate-12"></div>
          <h1 className="text-2xl font-bold tracking-wide text-purple-100">
            LUDOPOLIS
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="cursor-target hover:text-purple-300 transition-colors">
            Games
          </a>
          <a href="#" className="cursor-target hover:text-purple-300 transition-colors">
            Categories
          </a>
          <a href="#" className="cursor-target hover:text-purple-300 transition-colors">
            About
          </a>
          <a href="#" className="cursor-target hover:text-purple-300 transition-colors">
            Cart (0)
          </a>
        </nav>
      </div>
    </header>
  );
}
