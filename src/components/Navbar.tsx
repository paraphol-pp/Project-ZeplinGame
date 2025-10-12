import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// components
import Container from "./Container";

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          : "bg-neutral-900/60 backdrop-blur-md"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3408/3408506.png"
              alt="logo"
              className="h-10 w-10 object-cover"
            />
            <h1 className="text-3xl font-bold text-purple-600">
              Zeplin<span className="text-white">Game</span>
            </h1>
          </div>

          {/* Menu */}
          <ul className="flex space-x-8">
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
                        ? "text-purple-500 bg-purple-700/30"
                        : "text-gray-200 hover:text-purple-100 hover:bg-purple-700/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
