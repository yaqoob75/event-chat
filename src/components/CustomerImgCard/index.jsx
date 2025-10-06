import { useState } from "react";
import { fallbackImage } from "../../constants/home";

const CustomerImgCard = ({ image, title, alt }) => {
  const [imgSrc, setImgSrc] = useState(image || fallbackImage);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <div className="w-full rounded-lg border border-[#EEEEEE] p-4 overflow-hidden">
      <div className="relative">
        <img
          src={imgSrc}
          alt={alt || "Customer Image"}
          onError={handleImageError}
          className="w-full h-[397px] rounded-lg object-fit"
        />
      </div>
      <h3 className="text-center text-base mt-3 font-normal">
        {title || "No description available"}
      </h3>
    </div>
  );
};

export default CustomerImgCard;
