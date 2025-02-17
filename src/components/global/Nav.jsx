import React from "react";
import { Link } from "react-router-dom"; // Ensure you're using the correct routing method

const Nav = () => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyLogo</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-blue-500 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Optional) */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
