import { useEffect, useState, useRef } from "react";

import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { searchGames } from "../store/gamesSlice";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const desktopInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gamesState = useAppSelector((s: any) => s.games);

  // derive list of game names (no fallback — show nothing if API/store empty)
  const allNames: string[] = (() => {
    if (!gamesState) return [];
    if (Array.isArray(gamesState.list))
      return gamesState.list.map((g: any) => g.name ?? g.title ?? "").filter(Boolean);
    if (Array.isArray(gamesState.items))
      return gamesState.items.map((g: any) => g.name ?? g.title ?? "").filter(Boolean);
    if (Array.isArray(gamesState.names)) return gamesState.names.filter(Boolean);
    return [];
  })();

  const filteredSuggestions =
    search.trim().length > 0
      ? allNames
          .filter(
            (n) =>
              n &&
              n.toLowerCase().startsWith(search.trim().toLowerCase())
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(searchGames(search));
      navigate("/");
      setIsOpen(false);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (name: string) => {
    dispatch(searchGames(name));
    navigate("/");
    setSearch(name);
    setIsOpen(false);
    setShowSuggestions(false);
  };

  const menuItems = [
    { name: "home", path: "/" },
    { name: "favorite", path: "/favorites" },
    { name: "about", path: "/about" },
    { name: "blog", path: "/blog" },
    { name: "contact", path: "/contact" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isTop
          ? "bg-transparent"
          : "bg-neutral-900/70 backdrop-blur-md shadow-md"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2 hover:scale-105 transition-all duration-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3408/3408506.png"
              alt="logo"
              className="h-10 w-10 object-cover"
            />
            <a href="/">
              <h1 className="text-3xl font-bold text-indigo-600">
                Zeplin<span className="text-white">Game</span>
              </h1>
            </a>
          </div>

          {/* Search bar */}
          <div className="hidden md:block w-1/3 relative">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-neutral-800/60 rounded-full px-4 py-2 border border-neutral-500/40 focus-within:ring-2 focus-within:ring-indigo-600 transition-all"
            >
              <FaSearch className="text-gray-400 mr-2" />
              <input
                ref={desktopInputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Search games..."
                className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
              />
            </form>

            {/* Clear (X) button desktop */}
            {search && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setSearch("");
                  setShowSuggestions(false);
                  desktopInputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 z-50"
              >
                <FaTimes />
              </button>
            )}

            {/* Suggestions dropdown (desktop) */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-neutral-900/45 backdrop-blur-md border border-neutral-700/10 rounded-xl shadow-lg overflow-hidden z-50">
                {filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectSuggestion(s)}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-800/60 text-gray-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/*  Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item) => {
              const currentPath = location.pathname.toLowerCase();
              const isActive =
                item.path === "/"
                  ? currentPath === "/" || currentPath.includes("/game/")
                  : currentPath === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`capitalize px-3 py-2 rounded-md transition-all duration-300 font-medium ${
                      isActive
                        ? "text-indigo-300 bg-indigo-700/30"
                        : "text-gray-200 hover:text-indigo-100 hover:bg-indigo-700/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* button mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </Container>

      {createPortal(
          <AnimatePresence>
            {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[1000] bg-black/50 "
                onClick={() => setIsOpen(false)}
              />

              {/* Slide-up menu */}
              <motion.div
                key="menu"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed bottom-0 left-0 right-0 z-[1001] h-[50vh] bg-neutral-900/45 backdrop-blur-md rounded-t-3xl flex flex-col items-center justify-center space-y-6 text-center overflow-y-auto"
              >
                <div className="w-4/5 relative">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center bg-neutral-800/60 rounded-full px-4 py-2 w-full border border-neutral-500/40 focus-within:ring-2 focus-within:ring-indigo-600 transition-all"
                  >
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                      ref={mobileInputRef}
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                      placeholder="Search games..."
                      className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                    />
                  </form>

                  {/* Clear (X) button mobile */}
                  {search && (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSearch("");
                        setShowSuggestions(false);
                        mobileInputRef.current?.focus();
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 z-50"
                    >
                      <FaTimes />
                    </button>
                  )}

                   {/* Suggestions (mobile) */}
                   {showSuggestions && (
                     filteredSuggestions.length > 0 ? (
                       <div className="absolute left-0 right-0 mt-2 bg-neutral-900/45 border border-neutral-700 rounded-xl shadow-lg overflow-hidden z-50">
                         {filteredSuggestions.map((s) => (
                           <button
                             key={s}
                             onMouseDown={(e) => e.preventDefault()}
                             onClick={() => selectSuggestion(s)}
                             className="w-full text-left px-4 py-2 hover:bg-neutral-800/60 text-gray-200"
                           >
                             {s}
                           </button>
                         ))}
                       </div>
                     ) : (
                       search.trim().length > 0 && (
                         <div className="absolute left-0 right-0 mt-2 bg-neutral-900/45 border border-neutral-700 rounded-xl shadow-lg overflow-hidden z-50">
                           <div className="w-full text-left px-4 py-3 text-gray-300">
                             Game not Found
                           </div>
                         </div>
                       )
                     )
                   )}
                 </div>

                {menuItems.map((item) => {
                  const currentPath = location.pathname.toLowerCase();
                  const isActive =
                    item.path === "/"
                      ? currentPath === "/" || currentPath.includes("/game/")
                      : currentPath === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`capitalize text-xl font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-indigo-600"
                          : "text-gray-200 hover:text-indigo-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </motion.div>
            </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Navbar;
