import React from "react";

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || "";

  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return { color: "#22c55e", bgColor: "#dcfce7", label: "Active" };
      case "expired":
        return { color: "#ef4444", bgColor: "#fee2e2", label: "Expired" };
      case "pending":
        return { color: "#f59e0b", bgColor: "#fef3c7", label: "Pending" };
      case "inactive":
        return { color: "#ef4444", bgColor: "#fee2e2", label: "Inactive" };
      case "completed":
        return { color: "#3b82f6", bgColor: "#dbeafe", label: "Completed" };
      case "cancelled":
        return { color: "#ef4444", bgColor: "#fee2e2", label: "Cancelled" };
      case "draft":
        return { color: "#8b5cf6", bgColor: "#ede9fe", label: "Draft" };
      case "published":
        return { color: "#10b981", bgColor: "#d1fae5", label: "Published" };
      default:
        return {
          color: "#6b7280",
          bgColor: "#f3f4f6",
          label: status || "Unknown",
        };
    }
  };

  const currentStatus = getStatusConfig(normalizedStatus);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 border border-[#D5D7DA] text-sm font-normal rounded-lg`}
      style={{ color: currentStatus.color }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: currentStatus.color }}
      ></span>
      <span>{currentStatus.label}</span>
    </span>
  );
};

export default StatusBadge;
