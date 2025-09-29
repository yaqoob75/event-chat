import { forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { sidebarLogo, sidebarItems } from "../../constants/home";

const Sidebar = forwardRef(({ isOpen, setIsOpen }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      ref={ref}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-8">
        <img
          src={sidebarLogo}
          alt="icon"
          className="mt-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(false)}
        >
          <FiX className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-8 px-4">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-[#8FCFFF] text-black"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  isActive ? "active-icon" : ""
                }`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
});

export default Sidebar;
