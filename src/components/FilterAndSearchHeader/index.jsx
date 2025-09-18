import React from "react";
import { LuListFilter } from "react-icons/lu";
import CustomButton from "../CustomButton";
import FilterSelect from "../FilterSelect";
import SearchInput from "../SearchInput";

const FilterAndSearchHeader = ({
  title,
  isFilterVisible,
  toggleFilter,
  selectedFilter,
  filterOptions,
  onFilterChange,
  showFilterSelect = false,
  searchText,
  onSearchChange,
  extra = "my-0",
}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row md:justify-between md:items-center md:pb-3 ${extra}`}
    >
      <h1 className="xl:text-lg text-base font-bold">{title}</h1>
      <div className="w-full lg:w-[80%] md:w-[75%] xl:w-1/2 flex flex-col xs:flex-col sm:flex-row items-center justify-end gap-1 xl:gap-4">
        <CustomButton
          btnTitle="Filters"
          icon={<LuListFilter className="h-5 w-5" strokeWidth={2} />}
          borderRadius="rounded-lg"
          width="w-full sm:w-[8rem]"
          extra="mt-2"
          onClick={toggleFilter}
          fontWeight="font-semibold"
          hoverClass="hover:bg-gray-100"
        />
        {showFilterSelect && isFilterVisible && (
          <FilterSelect
            id="filterBy"
            value={selectedFilter}
            options={filterOptions}
            onSelect={onFilterChange}
            placeholder="Select..."
            selectClass="mt-2"
            width="w-full sm:w-[20rem]"
          />
        )}
        <SearchInput
          value={searchText}
          onChange={onSearchChange}
          extra="mt-1"
          width="w-full sm:w-[20rem]"
        />
      </div>
    </div>
  );
};

export default FilterAndSearchHeader;
