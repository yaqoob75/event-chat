import React from "react";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

const DashboardSummaryCard = ({
  value,
  title,
  icon: Icon,
  iconColor,
  trend,
  trendValue,
  trendPeriod,
  hasRightBorder = true,
}) => {
  return (
    <div
      className={`${hasRightBorder ? "pr-5 border-r border-[#E6EDFF]" : ""}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h2>
          <div className={`p-2 rounded-lg bg-white shadow-sm`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
        <p className="text-base font-normal -mt-2"> {title} </p>

        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-1 py-1 rounded-full">
            {trend === "up" && (
              <FiArrowUpRight
                className="w-5 h-6 text-green-500"
                strokeWidth={2}
              />
            )}
            {trend === "down" && (
              <FiArrowDownLeft
                className="w-5 h-6 text-red-500"
                strokeWidth={2}
              />
            )}
            <span className="text-sm font-normal text-[#7C8DB5]">
              {trendValue}
            </span>
          </div>
          <span className="text-sm font-normal text-[#7C8DB5]">
            {trendPeriod}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;
