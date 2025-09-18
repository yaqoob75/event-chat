import React from "react";
import SearchBar from "../components/SearchBar";

const Header = ({ value, onChange, children }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-white ">
      <SearchBar value={value} onChange={onChange} />
      <div className="flex items-center ">{children}</div>
    </div>
  );
};

export default Header;
