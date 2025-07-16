import React, { useState, useRef, useEffect } from "react";
import { logout } from "@/lib/auth";

const AdminHeader: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node) &&
          modalInputRef.current && !modalInputRef.current.contains(event.target as Node)) {
        setSearchActive(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#06080a] flex items-center justify-between px-6 py-2 shadow-md border-b border-[#232c47]">
      {/* Left: Search */}
      <div className="flex items-center flex-1 relative">
        <div className="relative w-80">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#23282d] text-[#bfc9d1] placeholder-[#bfc9d1] focus:outline-none focus:bg-[#232c31] focus:ring-2 focus:ring-[#3b82f6] focus:placeholder-white transition-all duration-200"
            onFocus={() => setSearchActive(true)}
            ref={searchInputRef}
            readOnly // Prevent typing in header search, modal handles input
          />
          {/* Dropdown Modal */}
          {searchActive && (
            <div className="absolute left-0 top-12 w-[32rem] rounded-xl bg-[#181c20] shadow-2xl border border-[#232c47] p-6 z-50 backdrop-blur-sm" onClick={e => e.stopPropagation()}>
              {/* Modal Search Bar */}
              <div className="flex items-center mb-4">
                <span className="text-gray-400 mr-3 text-xl">🔍</span>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-3 py-2 rounded-full bg-[#23282d] text-[#bfc9d1] placeholder-[#bfc9d1] focus:outline-none focus:bg-[#232c31] focus:ring-2 focus:ring-[#3b82f6] focus:placeholder-white transition-all duration-200"
                  ref={modalInputRef}
                />
                <button className="ml-3 text-gray-400 hover:text-white text-2xl" onClick={() => setSearchActive(false)}>&times;</button>
              </div>
              {/* Modal Content (placeholder) */}
              <div className="text-[#bfc9d1] space-y-6">
                <div>
                  <a href="#" className="text-blue-400 hover:underline">Advanced search</a>
                </div>
                <div>
                  <div className="font-semibold mb-2 text-white">Recent</div>
                  <ul className="space-y-1">
                    <li>• App / ... / Create new</li>
                    <li>• Homepage / E-commerce</li>
                    <li>• Pages / Starter</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2 text-white">Files</div>
                  <ul className="space-y-1">
                    <li>📁 aurora_test17.zip</li>
                    <li>📄 Product image(11).webp</li>
                    <li>📄 How_to_not_click_on_perfectly_innocent_looking...</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2 text-white">Contacts</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#232c31] px-3 py-1 rounded-full">Gojo Satoru</span>
                    <span className="bg-[#232c31] px-3 py-1 rounded-full">Nanami Kento</span>
                    <span className="bg-[#232c31] px-3 py-1 rounded-full">Kugisaki Nobara</span>
                    <span className="bg-[#232c31] px-3 py-1 rounded-full">Zenin Maki</span>
                    <span className="bg-[#232c31] px-3 py-1 rounded-full">Todo Aoi</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <span className="mr-2">📣</span> {/* Announcements */}
        <span className="mr-2">🔔</span> {/* Notifications */}
        <span className="mr-2">👥</span> {/* Quick Switch */}
        <span className="mr-2">🌐</span> {/* Language Selector */}
        <span className="mr-2">🎨</span> {/* Theme Toggle */}
        <span className="mr-2">⚙️</span> {/* Quick Settings */}
        {/* User Avatar Dropdown */}
        <div className="relative group">
          <button className="flex items-center focus:outline-none">
            <span className="mr-2">👤</span>
          </button>
          <div className="absolute right-0 mt-2 w-56 bg-[#232c47] rounded shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <a href="#" className="block px-4 py-2 text-white hover:bg-[#2d3656]"><span className="mr-2">🧑</span>Profile & Preferences</a>
            <a href="#" className="block px-4 py-2 text-white hover:bg-[#2d3656]"><span className="mr-2">🔐</span>Security Settings</a>
            <a href="#" className="block px-4 py-2 text-white hover:bg-[#2d3656]"><span className="mr-2">🏷️</span>My Roles</a>
            <a href="#" className="block px-4 py-2 text-white hover:bg-[#2d3656]"><span className="mr-2">🆘</span>Help Center</a>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-[#2d3656]">
              <span className="mr-2">🚪</span>Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 