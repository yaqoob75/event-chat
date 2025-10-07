import CustomerImgCard from "../CustomerImgCard";

const CustomerProfileImages = ({ user }) => {
  const customerImages =
    user?.imageDetail?.map((item) => ({
      id: item?._id,
      image: item?.image,
      title: item?.description,
      alt: "Icon",
    })) || [];

  return (
    <>
      <div className="px-6 grid grid-cols-3 gap-8">
        {customerImages?.length > 0 ? (
          customerImages.map((card) => (
            <CustomerImgCard
              key={card.id}
              image={card.image}
              title={card.title}
              alt={card.alt}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No data available</p>
        )}
      </div>
      <div className="px-6 border-b border-gray-200 my-4"></div>
    </>
  );
};

export default CustomerProfileImages;
