import { User, LogOut, ShoppingCart, LogIn } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLogout } from "@/hooks/useLogout";
import { Link } from "@tanstack/react-router";
import { useGetMe } from "@/hooks/useGetMe";
import { HomeCatSkeletons } from "./home/skeletons/home-cat-skeletons";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending } = useLogout();
  const { data: me, isLoading } = useGetMe();
  console.log(me);

  const links = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  if (isLoading) return <HomeCatSkeletons />

  return (
    <header className="p-6 border-b border-purple-500/30 backdrop-blur-sm bg-black/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-2 cursor-target">
            <div className="w-8 h-8 bg-purple-500 border-2 border-white transform rotate-12"></div>
            <h1 className="text-2xl font-bold tracking-wide text-purple-100">
              LUDOPOLIS
            </h1>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="cursor-target hover:text-purple-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <span className="cursor-target hover:text-purple-300 transition-colors">
            <ShoppingCart className="w-6 h-6" />
          </span>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleUserClick}
              className="cursor-target hover:text-purple-300 transition-colors p-1"
            >
              <User className="w-6 h-6" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-lg z-50">
                {me?.user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-500/20 transition-colors text-purple-100 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isPending ? "Logging out..." : "Logout"}</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-500/20 transition-colors text-purple-100 hover:text-white"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-500/20 transition-colors text-purple-100 hover:text-white"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
