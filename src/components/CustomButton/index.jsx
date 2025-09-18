import React from "react";

const CustomButton = ({
  btnTitle,
  backgroundColor,
  borderColor = "border-[#D5D7DA]",
  fontSize,
  fontColor,
  fontWeight = "font-normal",
  borderWidth = "border",
  width,
  height = "h-[45px]",
  borderRadius = "rounded-lg",
  padding,
  minHeight,
  position,
  bgBlur,
  children,
  icon,
  isRightIcon = false,
  margin,
  opacity,
  disabled = false,
  image,
  altText,
  onClick,
  customButtonClass,
  imageClass,
  gap,
  type,
  btnPadding,
  hoverClass,
  loading = false,
  extra,
  textSize = "text-base",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`
        ${width ? width : "w-full"}
        ${extra}
        ${height}
        ${
          disabled || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : `${backgroundColor} cursor-pointer`
        }
        ${opacity}
        ${bgBlur}
        ${margin}
        ${borderColor}
        ${borderWidth}
        md:${fontSize}
        ${textSize}
        ${fontColor}
        ${fontWeight}
        ${borderRadius}
        ${padding}
        ${minHeight}
        ${position}
        ${customButtonClass}
        flex items-center justify-center
        ${gap ? gap : "md:gap-3 gap-1"}
        ${btnPadding}
        ${!disabled && !loading ? hoverClass : ""}
      `}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {!isRightIcon && icon && icon}
          {image && (
            <img
              src={image}
              alt={altText}
              className={`${imageClass} h-full object-contain`}
            />
          )}
          {btnTitle && btnTitle}
          {children}
          {isRightIcon && icon && icon}
        </>
      )}
    </button>
  );
};

export default CustomButton;
