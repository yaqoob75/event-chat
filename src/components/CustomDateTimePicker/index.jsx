import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateTimePicker = ({
  label,
  name,
  placeholder = "MM-DD-YYYY hh:mm:ss",
  dateFormat = "MM-dd-yyyy HH:mm:ss",
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <div className="w-full">
          <div
            className={`relative bg-gray-100 ${
              meta.error ? "border border-red-500" : ""
            } rounded-lg p-4`}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {label}
            </label>
            <DatePicker
              {...field}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                form.setFieldValue(name, date);
              }}
              onBlur={() => form.setFieldTouched(name, true)}
              dateFormat={dateFormat}
              placeholderText={placeholder}
              className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
              wrapperClassName="w-full"
              popperClassName="react-datepicker-popper"
              showTimeSelect
              timeFormat="HH:mm:ss"
              timeIntervals={1}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              timeCaption="Time"
              {...props}
            />
          </div>
          {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default CustomDateTimePicker;
