import dayjs from "dayjs";
import { FaQuestionCircle } from "react-icons/fa";
// import { channelIconMap } from "../mock/data";

// utils/generateBreadcrumbs.js
export const pathNameToLabel = {
  "inspector-dashboard": "Inspector Dashboard",
  "admin-dashboard": " Dashboard",
  "owner-dashboard": " Dashboard",
  orders: "Manage Orders",
  Customers: "Customers",
  reports: "Reports",
  tasks: "Tasks",
  "market-place": "Manage Marketplace",
  certificates: "Manage Certificates",
  forms: "Manage Forms",
  "user-management": "User Management",
};

export function generateBreadcrumbs(pathname) {
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = pathNameToLabel[segment] || segment;

    return { label, path };
  });

  return breadcrumbs;
}
export const getStatusBadge = (status) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium";
  if (status === "Open") {
    return `${baseClasses} bg-green-100 text-green-700`;
  } else if (status === "Pending") {
    return `${baseClasses} bg-yellow-100 text-yellow-700`;
  }
  return baseClasses;
};
export const maskApiKey = (key) => {
  if (!key) return "";
  // Show last 4 characters, mask the rest
  const lastFour = key.slice(-4);
  return `****${lastFour}`;
};
export const dateFormatToTime = (date) => {
  return dayjs(date).format("h:mm A");
};
