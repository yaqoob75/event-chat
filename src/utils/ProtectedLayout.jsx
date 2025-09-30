import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { TopBar, Sidebar } from "../components";

const ProtectedLayout = () => {
  const { token } = useSelector((state) => state?.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [headerText, setHeaderText] = useState("Dashboard");
  const [subHeaderText, setSubHeaderText] = useState("");
  const sidebarRef = useRef(null);

  // Function to update header
  const updateHeaderConfig = (config) => {
    if (config.isHeader !== undefined) {
      setShowHeader(config.isHeader);
    }
    if (config.headerText) {
      setHeaderText(config.headerText);
    }
    if (config.subHeaderText !== undefined) {
      setSubHeaderText(config.subHeaderText);
    }
  };

  useEffect(() => {
    if (!token) {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      return;
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 1024 &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        ref={sidebarRef}
      />
      <div className="transition-all duration-300 ease-in-out flex-1">
        {showHeader && (
          <TopBar
            toggleSidebar={toggleSidebar}
            isOpen={sidebarOpen}
            headerText={headerText}
            subHeaderText={subHeaderText}
          />
        )}
        <main className={`${showHeader ? "p-6" : ""}`}>
          <Outlet context={{ updateHeaderConfig }} />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
