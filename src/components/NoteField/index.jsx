import { Field } from "formik";

const NoteField = ({ label, name, placeholder, extra, rows = 4, ...props }) => {
  return (
    <div className={`w-full ${extra}`}>
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
                <textarea
                  {...field}
                  {...props}
                  rows={rows}
                  placeholder={placeholder}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base resize-none"
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

export default NoteField;
