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
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const iconRef = useRef();
  const menuRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== iconRef.current && e.target !== menuRef.current) {
      setClick(false);
    }
  });

  const firstName = localStorage.getItem("first name").charAt(0);
  const lastName = localStorage.getItem("last name").charAt(0);
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
                    : "hover:text-blue-600 transition-colors duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/dashboard/about"
                className={` ${
                  location.pathname === "/dashboard/about"
                    ? "text-blue-600"
                    : "hover:text-blue-600 transition-colors duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              <Link
                to="/dashboard/contact"
                className={` ${
                  location.pathname === "/dashboard/contact"
                    ? "text-blue-600"
                    : "hover:text-blue-600 transition-colors duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Contact
              </Link>
              <Link
                to="/dashboard/profile"
                className={`${
                  location.pathname === "/dashboard/profile"
                    ? "text-blue-600"
                    : "hover:text-blue-600 transition-colors duration-200 text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Profile
              </Link>
              <div
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setClick(!click)}
                ref={iconRef}
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className=" h-6 w-6"
                  ref={iconRef}
                />
              </div>
              {click ? (
                <ul
                  ref={menuRef}
                  className=" absolute top-10 right-60 mt-2 py-1 w-40 bg-white border border-gray-200 rounded-xl shadow-md"
                >
                  <li className=" px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className=" px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <li
                    className=" px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      setClick(!click);
                    }}
                  >
                    Logout
                  </li>
                </ul>
              ) : null}
            </div>
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
