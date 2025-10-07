import { useState } from "react";
import { fallbackImage } from "../../constants/home";

const EventsAttendedCard = ({
  image,
  title,
  subtitle,
  location,
  date,
}) => {
  const [imgSrc, setImgSrc] = useState(image || fallbackImage);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <div className="rounded-lg p-4 border border-[#EEEEEE] bg-white hover:shadow-xl transition-shadow duration-200">
      <div className="h-48">
        <img
          src={imgSrc}
          alt="img"
          onError={handleImageError}
          className="w-full h-full rounded-md object-cover"
        />
      </div>
      <div className="px-1 pt-4">
        <p className="text-xs font-normal">{subtitle}</p>
        <h3 className="text-base font-medium mb-3">{title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-xs gap-1">
            <span>Location {location}</span>
            <div className="flex items-center gap-1 mx-1">
              <span className="h-1 w-1 rounded-full bg-gray-600"></span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAttendedCard;
