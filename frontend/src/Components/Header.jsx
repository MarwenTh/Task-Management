import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { label: "Settings" },
    { label: "profile" },
    { label: "logout", onClick: handleLogout },
  ];

  const firstName = localStorage.getItem("first name");
  const lastName = localStorage.getItem("last name");
  const email = localStorage.getItem("email");
  const firstNameLetter = localStorage.getItem("first name").charAt(0);
  const lastNameLetter = localStorage.getItem("last name").charAt(0);
  return (
    <div>
      <nav className="bg-black">
        <div className="flex justify-around mx-20 py-4">
          <div>
            <Link to="/dashboard" className="flex gap-3">
              <img
                className="h-8 w-69"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <span className="text-white font-bold text-2xl">Workflow</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className={` ${
                  location.pathname === "/dashboard"
                    ? "text-blue-600"
                    : "hover:text-blue-600 hover:-translate-y-1 transition-all duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/dashboard/about"
                className={` ${
                  location.pathname === "/dashboard/about"
                    ? "text-blue-600"
                    : "hover:text-blue-600 hover:-translate-y-1 transition-all duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              <Link
                to="/dashboard/contact"
                className={` ${
                  location.pathname === "/dashboard/contact"
                    ? "text-blue-600"
                    : "hover:text-blue-600 hover:-translate-y-1 transition-all duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Contact
              </Link>
              <Link
                to="/dashboard/profile"
                className={`${
                  location.pathname === "/dashboard/profile"
                    ? "text-blue-600"
                    : "hover:text-blue-600 hover:-translate-y-1 transition-all duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className=" relative">
            <button
              onClick={() => setMenuIsOpen(!menuIsOpen)}
              className=" text-sm rounded-full bg-[#507adc] text-white py-2 px-2"
            >
              {firstNameLetter + lastNameLetter}
            </button>
            {menuIsOpen && (
              <ul
                className={`absolute top-8 right-0 mt-2 py-1 w-52 bg-[#213363] rounded-lg shadow-md text-white text-sm ${
                  menuIsOpen
                    ? "opacity-1 translate-y-0 transition-all duration-500 ease-in-out"
                    : "opacity-0 translate-y-[-10px] transition-all duration-500 ease-in-out"
                }`}
              >
                <li className="px-4 py-2 border-b">
                  {firstName + " " + lastName} {email}
                </li>
                {menuItems.map((item, index) => (
                  <li
                    className="px-4 py-2 hover:bg-[#334c8f] cursor-pointer"
                    key={index}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Header;
