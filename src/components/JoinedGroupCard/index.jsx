const JoinedGroupCard = ({ title, image, avatars }) => {
  const maxVisible = 4;
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <div className="rounded-lg p-4 border border-[#EEEEEE] bg-white hover:shadow-xl">
      {/* Image */}
      <div className="relative h-64 rounded-md overflow-hidden mb-3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      {/* Card Content */}
      <div className="flex flex-col justify-between">
        <h3 className="text-base font-medium mb-3 capitalize">{title}</h3>
        {/* Avatars */}
        <div className="flex items-center -space-x-1">
          {visibleAvatars.map((avatar, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-white -ml-1 first:ml-0"
              style={{ zIndex: index + 1 }}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* +N Counter */}
          {remainingCount > 0 && (
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-xs font-normal text-white border border-white -ml-1"
              style={{ zIndex: visibleAvatars.length + 1 }}
            >
              {remainingCount}+
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinedGroupCard;
