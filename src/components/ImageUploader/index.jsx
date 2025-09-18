// import { useRef } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { imageUploader } from "../../constants/home";

// const ImageUploader = ({ image, setImage, placeholder="Banner Image" }) => {
//   const fileInputRef = useRef(null);

//   const handleFile = (file) => {
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage({ file, preview: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChange = (e) => {
//     handleFile(e.target.files[0]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     handleFile(e.dataTransfer.files[0]);
//   };

//   const handleRemove = () => {
//     setImage(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div
//       className="border-2 border-dashed border-[#8FCFFF] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition relative w-full"
//       onClick={() => fileInputRef.current.click()}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={handleDrop}
//     >
//       {image ? (
//         <div className="relative inline-block">
//           {/* Image */}
//           <img
//             src={image.preview}
//             alt="Uploaded"
//             className="max-h-48 object-contain rounded-lg"
//           />
//           <button
//             type="button"
//             className="absolute top-1 right-1 bg-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleRemove();
//             }}
//           >
//             <RxCross2 size={18} className="text-gray-900" />
//           </button>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center text-gray-500 pointer-events-none">
//           <img src={imageUploader} alt="icon" className="h-14 w-14" />
//           <p className="text-sm font-medium">{placeholder}</p>
//           <p className="text-xs text-gray-400">(up to 12 Mb)</p>
//         </div>
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default ImageUploader;





























import { useRef } from "react";
import { useField, useFormikContext } from "formik";
import { RxCross2 } from "react-icons/rx";
import { imageUploader } from "../../constants/home";

const ImageUploader = ({ title, placeholder = "Banner Image", name }) => {
  const fileInputRef = useRef(null);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const image = field.value;

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue(name, { file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    setFieldValue(name, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {title}
        </label>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition relative w-full ${
          meta.touched && meta.error
            ? "border-red-500"
            : "border-[#8FCFFF] hover:border-blue-500"
        }`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="relative inline-block">
            <img
              src={image.preview}
              alt="Uploaded"
              className="max-h-48 object-contain rounded-lg"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <RxCross2 size={18} className="text-gray-900" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500 pointer-events-none">
            <img src={imageUploader} alt="icon" className="h-14 w-14" />
            <p className="text-sm font-medium">{placeholder}</p>
            <p className="text-xs text-gray-400">(up to 12 Mb)</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {meta.touched && meta.error && (
        <p className="mt-1 text-xs text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default ImageUploader;

