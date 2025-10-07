import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidUserPin } from "react-icons/bi";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { RiArrowRightSLine } from "react-icons/ri";
import {
  notificationIcon,
  getFullName,
  formatMemberType,
} from "../../constants/home";
import { logout } from "../../store/auth/authSlice";
import Image from "../Image";

const TopBar = ({ toggleSidebar, headerText = "Dashboard", subHeaderText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state?.auth);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/");
  };

  const fullName = getFullName(user);

  return (
    <header className="bg-white border-b border-[#F0F1F3]">
      <div className="flex items-center justify-between py-2 px-6">
        {/* Left side */}
        <div className="flex items-center">
          <button
            className="lg:hidden mr-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={toggleSidebar}
          >
            <FiMenu className="h-6 w-6" />
          </button>

          <nav className="flex items-center space-x-1 text-[#333843]">
            <h4 className="text-xl font-normal">{headerText}</h4>
            {subHeaderText && (
              <>
                <RiArrowRightSLine className="h-5 w-5" />
                <h5 className="text-base font-normal">{subHeaderText}</h5>
              </>
            )}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-700 cursor-pointer">
            <img src={notificationIcon} alt="" className="w-9 h-9" />
            <span className="absolute -top-2 -right-1.5 px-2 py-1 bg-[#1EB386] text-white text-xs rounded-full flex items-center justify-center">
              25
            </span>
          </button>

          <div className="relative border-l border-[#E0E2E7]">
            <button
              className="flex items-center space-x-2 px-3 py-2 rounded-md"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user?.profilePicture ? (
                <Image
                  src={user?.profilePicture}
                  className="w-10 h-10 rounded-full border-2 border-[#E0E2E7]"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border-[#E0E2E7] border-2">
                  <span className="text-white text-sm font-medium capitalize">
                    {fullName?.charAt(0) || "M"}
                  </span>
                </div>
              )}

              {/* Tooltip on hover */}
              <div
                className="text-left md:w-[120px] sm:w-[100px] group relative capitalize"
                title={fullName}
              >
                <div className="text-sm font-medium truncate capitalize">
                  {fullName}
                </div>
                <div className="text-xs text-gray-500">
                  {formatMemberType(user?.role)}
                </div>
              </div>

              <FiChevronDown
                className={`w-5 h-5 text-gray-600 transform transition-transform duration-100 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                strokeWidth={2.5}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    type="button"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    <BiSolidUserPin className="w-5 h-5 mr-3" />
                    Profile
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    type="button"
                    onClick={() => {
                      navigate("/settings");
                      setDropdownOpen(false);
                    }}
                  >
                    <IoSettingsSharp className="w-5 h-5 mr-3" />
                    Settings
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    type="button"
                    onClick={handleLogout}
                  >
                    <IoLogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default TopBar;
