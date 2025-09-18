import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = (props) => {
  const {
    value,
    onChange,
    width = "w-full",
    height = "h-11",
    bgColor = "bg-white",
    borderColor = "border-[#D5D7DA]",
    textColor = "text-black",
    placeholder = "Search",
    extra,
  } = props;

  return (
    <div
      className={`${width} ${height} relative rounded-md border ${borderColor} ${extra} flex items-center`}
    >
      <CiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        strokeWidth={1}
        size={20}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${bgColor} ${textColor} rounded-md py-2 pl-10 pr-10 text-sm focus:outline-none`}
      />
    </div>
  );
};

export default SearchInput;
