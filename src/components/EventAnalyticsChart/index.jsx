import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
  Tooltip,
} from "recharts";

const EventAnalyticsChart = ({
  data = [],
  title = "Event Analytics",
  showYearly = true,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Yearly");
  const [hoveredData, setHoveredData] = useState(null);

  const chartData = data.length > 0 ? data : [];

  // Filter options
  const periodOptions = ["Weekly", "Monthly", "Yearly"];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 border border-[#E6EDFF] rounded-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">
            {data.fullDate}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span className="text-xs text-gray-600">Paid Events:</span>
              </div>
              <span className="text-xs font-medium text-gray-900">
                {data.paidEvents}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-xs text-gray-600">Free Events:</span>
              </div>
              <span className="text-xs font-medium text-gray-900">
                {data.freeEvents}
              </span>
            </div>
            {data.revenue && (
              <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-100">
                <span className="text-xs text-gray-600">Revenue:</span>
                <span className="text-xs font-medium text-gray-900">
                  $
                  {data.revenue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Handle period change
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // Here you would typically filter your data based on the selected period
    console.log(`Filtering data for: ${period}`);
  };

  // Find March data for highlight
  const marchData = chartData.find((item) => item.month === "Mar");
  const highlightDate = "15 Mar 2025";
  const highlightValue = marchData
    ? `$${marchData.revenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`
    : "$59,492.10";

  return (
    <div className="w-full h-96 bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <div className="flex items-center gap-6">
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <span className="text-sm text-gray-600">Paid Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Free Events</span>
            </div>
          </div>

          {/* Period dropdown */}
          {showYearly && (
            <div className="px-3 py-2 relative rounded-lg border border-[#E6EDFF]">
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer"
              >
                {periodOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            onMouseMove={(data) => {
              if (data && data.activePayload) {
                setHoveredData(data.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => setHoveredData(null)}
          >
            {/* Custom Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Axes */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />

            {/* Highlight area for March */}
            <ReferenceLine
              x="Mar"
              stroke="#e5e7eb"
              strokeWidth={40}
              strokeOpacity={0.3}
            />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="paidEvents"
              stroke="#374151"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#374151",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
            <Line
              type="monotone"
              dataKey="freeEvents"
              stroke="#FB923C"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#FB923C",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Highlight label for March */}
        <div className="absolute top-4 left-1/4 transform -translate-x-1/2">
          <div className="text-center bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">{highlightDate}</div>
            <div className="text-sm font-semibold text-gray-900">
              {highlightValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalyticsChart;
