import { Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  showPassword,
  setShowPassword,
  ...props
}) => {
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <Field name={name}>
        {({ field, meta }) => (
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
                <input
                  {...field}
                  {...props}
                  type={inputType}
                  placeholder={placeholder}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base pr-10"
                />
                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showPassword ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </button>
                )}
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

export default InputField;
