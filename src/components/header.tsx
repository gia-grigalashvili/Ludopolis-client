import { User, LogOut, LogIn, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLogout } from "@/hooks/useLogout";
import { Link } from "@tanstack/react-router";
import { useGetMe } from "@/hooks/useGetMe";
import { HomeCatSkeletons } from "./home/skeletons/home-cat-skeletons";

import { useGetCart } from "@/hooks/useGetCart";
import { CartSheet } from "./cart/cart-sheet";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending } = useLogout();
  const { data: me, isLoading } = useGetMe();
  const { data: cartData, isLoading: isCartLoading } = useGetCart(me?.id);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (isLoading || isCartLoading) return <HomeCatSkeletons />;

  return (
    <>
      <header className="p-6 border-b border-purple-500/30 backdrop-blur-sm bg-black/20 relative z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center space-x-2 cursor-target">
              <div className="w-8 h-8 bg-purple-500 border-2 border-white transform rotate-12"></div>
              <h1 className="text-2xl font-bold tracking-wide text-purple-100">
                LUDOPOLIS
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

            <CartSheet cart={cartData} />

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleUserClick}
                className="cursor-target hover:text-purple-300 transition-colors p-1"
              >
                <User className="w-6 h-6" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-lg z-50">
                  {me?.id ? (
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

          {/* Mobile Burger Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {me?.id && <CartSheet cart={cartData} />}
            <button
              onClick={toggleMobileMenu}
              className="cursor-target hover:text-purple-300 transition-colors p-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-black/95 backdrop-blur-sm border-l border-purple-500/30 z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 border-2 border-white transform rotate-12"></div>
              <h2 className="text-lg font-bold tracking-wide text-purple-100">
                LUDOPOLIS
              </h2>
            </div>
            <button
              onClick={closeMobileMenu}
              className="cursor-target hover:text-purple-300 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-4 mb-8">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={closeMobileMenu}
                className="block py-3 px-4 rounded-lg cursor-target hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-200 text-purple-100 active:bg-purple-500/30 active:text-white active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile User Actions */}
          <div className="border-t border-purple-500/30 pt-6 ">
            {me?.id ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2 text-purple-100">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Logged in</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-500/20 transition-all duration-200 text-purple-100 hover:text-white active:bg-purple-500/30 active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isPending ? "Logging out..." : "Logout"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/signin"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-500/20 transition-all duration-200 text-purple-100 hover:text-white active:bg-purple-500/30 active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-500/20 transition-all duration-200 text-purple-100 hover:text-white active:bg-purple-500/30 active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
