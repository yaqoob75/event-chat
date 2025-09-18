const ProfileAvatar = ({ src, alt, size = "lg", imgBorder = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ${imgBorder}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="text-gray-500 text-lg font-medium">
          {alt?.charAt(0)?.toUpperCase() || "O"}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
