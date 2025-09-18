import { Field } from "formik";
import Select from "react-select";

const CustomSelect = ({
  label,
  name,
  placeholder = "Select",
  extra,
  options = [],
  ...props
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: "auto",
      cursor: "pointer",
      "&:hover": {
        border: "none",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6B7280",
      padding: "0",
      "&:hover": {
        color: "#6B7280",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6B7280",
      fontSize: "16px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
      fontSize: "16px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      marginTop: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#F3F4F6"
        : state.isFocused
        ? "#F9FAFB"
        : "white",
      color: "#111827",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F9FAFB",
      },
    }),
  };

  return (
    <div className={`w-full ${extra}`}>
      <Field name={name}>
        {({ field, meta, form }) => (
          <div className="relative">
            <div
              className={`bg-gray-100 rounded-xl px-4 py-4 relative ${
                meta.error ? "border border-red-500" : ""
              }`}
            >
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <div className="relative">
                <Select
                  {...props}
                  value={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                  onChange={(selectedOption) => {
                    form.setFieldValue(
                      name,
                      selectedOption ? selectedOption.value : ""
                    );
                  }}
                  options={options}
                  placeholder={placeholder}
                  styles={customStyles}
                  isSearchable={false}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
            {meta.touched && meta.error && (
              <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default CustomSelect;
