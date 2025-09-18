import React from "react";
import CustomButton from "../CustomButton";

const AuthSuccessModal = ({
  title,
  subTitle,
  message,
  buttonText,
  onClose,
  btnBgColor = "bg-[#8FCFFF]",
  BtnHoverClass = "hover:bg-[#6dbcf8]",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all shadow-lg">
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <h2 className="text-xl font-semibold text-gray-900">{subTitle}</h2>
          <p className="text-gray-600 text-sm mt-2 mb-6">{message}</p>
          <CustomButton
            btnTitle={buttonText}
            fontColor="text-black"
            fontWeight="font-normal"
            borderRadius="rounded-full"
            borderColor="border-0"
            textSize="text-base"
            onClick={onClose}
            backgroundColor={btnBgColor}
            hoverClass={BtnHoverClass}
            extra="transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSuccessModal;
