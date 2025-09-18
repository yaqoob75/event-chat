import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
  label,
  name,
  placeholder = "YYYY-MM-DD",
  dateFormat = "yyyy-MM-dd",
  ...props
}) => {
  return (
    <div className="w-full">
      <Field name={name}>
        {({ field, form, meta }) => (
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
                <DatePicker
                  {...props}
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    form.setFieldValue(name, date);
                  }}
                  onBlur={() => form.setFieldTouched(name, true)}
                  dateFormat={dateFormat}
                  placeholderText={placeholder}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
                  wrapperClassName="w-full"
                  popperClassName="react-datepicker-popper"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
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

export default CustomDatePicker;
