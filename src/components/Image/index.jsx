import { useState } from "react";
import { fallbackImage } from "../../constants/home";

const Image = ({
  src,
  alt = "image",
  className = "w-24 h-24 rounded-full object-cover",
}) => {
  const [error, setError] = useState(false);
  const validSrc = src && !error ? src : fallbackImage;

  return (
    <img
      src={validSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default Image;
