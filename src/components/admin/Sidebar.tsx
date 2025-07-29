import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { HiMenu, HiX, HiPlus, HiCalendar, HiBookOpen, HiCollection } from "react-icons/hi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const links = [
    { 
      to: "/Admin", 
      label: "Add CardBoard", 
      icon: HiPlus,
      description: "Create new board game"
    },
    { 
      to: "/Admin/month", 
      label: "Month", 
      icon: HiCalendar,
      description: "Monthly overview"
    },
    { 
      to: "/Admin/all", 
      label: "All Blogs", 
      icon: HiBookOpen,
      description: "Manage all blog posts"
    },
    { 
      to: "/Admin/categories", 
      label: "All Categories", 
      icon: HiCollection,
      description: "Manage game categories"
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-3 z-50 fixed top-4 left-4 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-[#1C1A25] via-[#1A1825] to-[#18162A] border-r border-purple-500/20 text-white transform transition-all duration-300 z-40 overflow-hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block md:h-[100vh]`}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-purple-100">Admin Panel</h2>
              <p className="text-xs text-purple-400">Manage your content</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {links.map(({ to, label, icon: IconComponent, description }) => {
              const isActive = pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`group block p-4 rounded-xl transition-all duration-200 relative overflow-hidden
                      ${isActive 
                        ? "bg-gradient-to-r from-purple-600/30 to-purple-700/20 border border-purple-400/50 text-white shadow-lg shadow-purple-500/10" 
                        : "hover:bg-purple-500/10 hover:border-purple-500/30 border border-transparent"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600"></div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-all
                        ${isActive 
                          ? "bg-purple-500/20 text-purple-300" 
                          : "bg-gray-700/30 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-300"
                        }
                      `}>
                        <IconComponent size={20} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold transition-colors
                          ${isActive ? "text-purple-100" : "text-gray-200 group-hover:text-purple-100"}
                        `}>
                          {label}
                        </div>
                        <div className={`text-xs transition-colors
                          ${isActive ? "text-purple-300" : "text-gray-500 group-hover:text-purple-400"}
                        `}>
                          {description}
                        </div>
                      </div>

                      {/* Arrow indicator for active state */}
                      {isActive && (
                        <div className="text-purple-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Subtle glow effect for active state */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent pointer-events-none"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-500/20 bg-gradient-to-t from-black/20 to-transparent">
          <div className="text-center">
            <div className="text-xs text-purple-400 mb-1">LUDOPOLIS</div>
            <div className="text-xs text-gray-500">Admin Dashboard</div>
          </div>
        </div>
      </div>
    </>
  );
}
