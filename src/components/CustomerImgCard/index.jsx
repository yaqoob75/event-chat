const CustomerImgCard = ({ image, title, alt }) => (
  <div className="w-full rounded-lg border border-[#EEEEEE] p-4 overflow-hidden">
    <div className="relative">
      <img
        src={image}
        alt={alt}
        className="w-full h-[397px] rounded-lg object-cover"
      />
    </div>
    <h3 className="text-center text-base mt-3 font-normal">{title}</h3>
  </div>
);

export default CustomerImgCard;
