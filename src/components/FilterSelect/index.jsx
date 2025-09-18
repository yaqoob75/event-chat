import React from "react";
import Select, { components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 text-gray-400 transform transition-transform ${
          props.selectProps.menuIsOpen ? "rotate-180" : ""
        }`}
        viewBox="0 0 25 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </components.DropdownIndicator>
  );
};

const FilterSelect = ({
  id,
  options,
  label,
  onSelect,
  value,
  width = "w-full",
  selectFieldWidth = "w-full",
  labelWidth = "w-full",
  labelFontSize = "text-[16px]",
  labelFontWeight = "font-normal",
  backgroundColor = "white",
  borderColor = "#A2A1A833",
  labelColor = "#EDBB6E",
  borderRadius = "8px",
  isMulti = false,
  placeholder = "Select category",
  extra,
  labelLeft = false,
  selectClass,
  error,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      marginTop: labelLeft ? "0px" : "4px",
      backgroundColor: backgroundColor,
      borderColor: error
        ? "#EF4444"
        : state.isFocused
        ? "#3b82f6"
        : borderColor,
      borderRadius: borderRadius,
      minHeight: "45px",
      padding: "3px 0px 3px 0px",
      width: selectFieldWidth,
      boxShadow: "none",
      "&:hover": {
        borderColor: error ? "#EF4444" : "#A2A1A833",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f3f4f6" : "white",
      color: "#374151",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#A2A1A833",
      },
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "4px",
      borderRadius: borderRadius,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div
      className={`relative ${width} ${extra} ${
        labelLeft ? "flex sm:flex-row flex-col sm:items-center gap-2" : ""
      }`}
    >
      <label
        htmlFor={id}
        className={`${labelWidth} ${labelFontSize} ${labelFontWeight} text-[${labelColor}] ${
          labelLeft ? "whitespace-nowrap" : ""
        }`}
      >
        {label}
      </label>
      <div
        className={`relative ${
          labelLeft ? "flex-1" : selectFieldWidth
        } ${selectClass}`}
      >
        <Select
          id={id}
          options={options}
          styles={customStyles}
          onChange={(option) => onSelect(option)}
          components={{ DropdownIndicator }}
          classNamePrefix="react-select"
          className={`${selectFieldWidth}`}
          placeholder={placeholder}
          isMulti={isMulti}
          value={value}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default FilterSelect;
