import React from "react";

const ActiveTabSwitch = ({ tabs, activeIndex, onChange }) => {
  return (
    <div className="flex border rounded-lg overflow-hidden w-fit border-[#D5D7DA]">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition relative
            ${
              activeIndex === index
                ? "bg-gray-50 text-gray-800"
                : "text-gray-500"
            }
            ${index !== 0 ? "border-l border-[#D5D7DA]" : ""}
          `}
        >
          {activeIndex === index && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ActiveTabSwitch;
