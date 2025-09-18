import { useState, useRef, useEffect } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const FilterDatePicker = ({
  value,
  onChange,
  placeholder = "Select date range",
  className = "",
  dateFormat = "dd MMM-dd MMM",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize dates from value prop
  useEffect(() => {
    if (value && value.start && value.end) {
      setStartDate(new Date(value.start));
      setEndDate(new Date(value.end));
    }
  }, [value]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const getDisplayValue = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)}-${formatDate(endDate)}`;
    }
    return placeholder;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else {
      // Complete selection
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }

      // Call onChange with the selected range
      const newValue = {
        start: date < startDate ? date : startDate,
        end: date < startDate ? startDate : date,
      };
      onChange && onChange(newValue);
      setIsOpen(false);
    }
  };

  const isDateInRange = (date) => {
    if (!startDate || !date) return false;

    if (endDate) {
      return date >= startDate && date <= endDate;
    }

    if (hoveredDate && hoveredDate >= startDate) {
      return date >= startDate && date <= hoveredDate;
    }

    return date.getTime() === startDate.getTime();
  };

  const isDateStart = (date) => {
    return startDate && date && date.getTime() === startDate.getTime();
  };

  const isDateEnd = (date) => {
    return endDate && date && date.getTime() === endDate.getTime();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Input Field */}
      <div
        className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <FiCalendar className="text-gray-500 w-4 h-4" />
          <span
            className={`text-sm ${
              startDate && endDate ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {getDisplayValue()}
          </span>
        </div>
        <FiChevronDown
          className={`text-gray-400 w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FiChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <h3 className="text-lg font-medium text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FiChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-xs font-medium text-gray-500 text-center py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((date, index) => (
              <div
                key={index}
                className="aspect-square flex items-center justify-center"
              >
                {date && (
                  <button
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`
                      w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors
                      ${
                        isDateStart(date) || isDateEnd(date)
                          ? "bg-blue-500 text-white font-medium"
                          : isDateInRange(date)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDatePicker;
