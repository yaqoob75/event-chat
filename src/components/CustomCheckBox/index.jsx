import { useField } from "formik";

const CustomCheckBox = ({
  name,
  title,
  disabled = false,
  size = "w-5 h-5",
  bgColor = "bg-[#171616]",
  tickColor = "text-white",
  className = "",
  extra,
}) => {
  const [field, meta, helpers] = useField({ name, type: "checkbox" });
  const { value } = field;
  const { setValue } = helpers;

  return (
    <div className={`flex flex-col ${extra} w-fit`}>
      <label
        className={`flex items-center space-x-2 cursor-pointer select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        <input
          type="checkbox"
          {...field}
          checked={value}
          onChange={() => setValue(!value)}
          disabled={disabled}
          className="hidden"
        />

        <div
          className={`${size} flex items-center justify-center rounded-md border transition
          ${
            value ? `${bgColor} border-transparent` : "bg-white border-gray-400"
          }
          ${disabled ? "bg-gray-200 border-gray-300" : ""}`}
        >
          {value && (
            <svg
              className={`w-4 h-4 ${tickColor}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        <span className="text-base font-light">{title}</span>
      </label>

      {meta.touched && meta.error && (
        <span className="text-red-500 text-xs mt-1">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomCheckBox;
