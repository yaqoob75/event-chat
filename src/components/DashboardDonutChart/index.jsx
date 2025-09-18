import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const DashboardDonutChart = ({
  data,
  title = "Graph Overview",
  centerText = "Overview",
  innerRadius = "60%",
  outerRadius = "90%",
}) => {
  return (
    <div className="rounded-xl p-4 border border-[#E6EDFF] w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold">{title}</h2>
        <button className="cursor-pointer" type="button">
          <PiDotsThreeOutlineFill />
        </button>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Tooltip on hover */}
            <Tooltip
              formatter={(value, name, props) => {
                const total = data.reduce((sum, d) => sum + d.value, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return [`${value} (${percent}%)`, props.payload?.name || name];
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E6EDFF",
                background: "#fff",
                padding: "6px 10px",
                fontSize: "14px",
              }}
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm sm:text-base lg:text-lg font-normal text-gray-700">
            {centerText}
          </span>
        </div>
      </div>

      {/* Legends */}
      <div className="flex justify-center flex-wrap gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDonutChart;
