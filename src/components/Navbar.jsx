import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  const guestLinks = [
    { path: "/", label: "Home" },
    { path: "/", label: "Exercises" },
    { path: "/", label: "Diet" },
    { path: "/", label: "Contact Us" },
    { path: "/login", label: "Log In" },
  ];

  const authLinks = [
    { path: "/Landing", label: "GYM😎" },
    { path: "/homepage", label: "Start" },
    { path: "/GymEquipment", label: "Equipments" },
    { path: "/DietSection", label: "Diet" },
    { path: "/Contact", label: "Contact Us" },
  ];

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <p className="text-4xl">💪</p>
          <span className="font-bold text-3xl">GymFit</span>
        </div>

        {/* Hamburger Button - يظهر على الشاشات الأقل من lg */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-lg items-center">
          {(user ? authLinks : guestLinks).map((link, i) => (
            <li key={i}>
              <Link
                to={link.path}
                className="hover:text-blue-400 transition cursor-pointer">
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li className="text-blue-300 font-semibold">
                Hello, {user.username || user.email} ❤️{" "}
              </li>
              <li>
                <button
                  onClick={logoutUser}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white transition">
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col space-y-4 mt-4 lg:hidden text-lg w-full items-center">
          {" "}
          {/* أضف w-full و items-center هنا */}
          {(user ? authLinks : guestLinks).map((link, i) => (
            <li key={i} className="w-full text-center">
              {" "}
              {/* أضف w-full و text-center هنا */}
              <Link
                to={link.path}
                className="hover:text-blue-400 transition cursor-pointer block">
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              {/* عرض اسم المستخدم هنا في قائمة الموبايل */}
              <li className="text-blue-300 font-semibold w-full text-center">
                {" "}
                {/* عدّل text-left إلى text-center */}
                Hello, {user.username || user.email}!{" "}
              </li>
              <li className="w-full flex justify-center">
                {" "}
                {/* اجعل الـ li بعرض كامل ووسّط محتواها باستخدام flex */}
                <button
                  onClick={logoutUser}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition">
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
