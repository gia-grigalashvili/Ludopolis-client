import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { HiMenu, HiX } from "react-icons/hi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const links = [
    { to: "/product/", label: "➕ Add CardBoard" },
    { to: "/product/month", label: "📅 Month" },
    { to: "/product/all", label: "📚 All Blogs" },
    { to: "/product/categories", label: "📚 All categories" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden text-white p-4 z-40 fixed top-[88px] left-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-[80px] left-0 h-[calc(100vh-80px)] w-64 bg-[#1C1A25] text-white px-6 py-8 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        <ul className="space-y-4">
          {links.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3 text-center rounded-xl transition-all 
                    ${isActive ? "border border-[#AD46FF] text-[#AD46FF]" : "hover:bg-[#2E2B38]"}
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
