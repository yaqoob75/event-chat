import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchField = (props) => {
  const {
    value,
    onChange,
    width = "w-full",
    height = "h-11",
    bgColor = "bg-white",
    borderColor = "border-[#D5D7DA]",
    textColor = "text-black",
    placeholder = "Search",
    shortcutKey = "⌘K",
    extra,
  } = props;

  return (
    <div
      className={`${width} ${height} ${borderColor} ${extra} flex relative rounded-md border items-center`}
    >
      <FiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        size={18}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${bgColor} ${textColor} rounded-md py-2 pl-10 pr-10 text-sm focus:outline-none`}
      />
      {shortcutKey && (
        <div className="absolute right-3 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200">
          {shortcutKey}
        </div>
      )}
    </div>
  );
};

export default SearchField;
