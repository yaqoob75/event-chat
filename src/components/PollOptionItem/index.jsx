import { Field, useField } from "formik";
import { RxCross2 } from "react-icons/rx";

const PollOptionItem = ({ index, onRemove, canRemove = true }) => {
  const [field, meta] = useField(`options.${index}`);

  return (
    <div className="relative flex flex-col gap-1 flex-1">
      <div className="flex items-center gap-3">
        <div
          className={`bg-gray-100 rounded-xl px-4 py-4 flex-1 border ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-200"
          }`}
        >
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Option {index + 1}
          </label>
          <Field
            {...field}
            type="text"
            placeholder="Anything"
            className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
          />
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-500 hover:text-red-600 focus:outline-none transition-colors p-1.5 rounded-full bg-[#7878801F]"
          >
            <RxCross2 size={22} />
          </button>
        )}
      </div>

      {meta.touched && meta.error && (
        <div className="text-sm text-red-500 ml-1">{meta.error}</div>
      )}
    </div>
  );
};

export default PollOptionItem;
