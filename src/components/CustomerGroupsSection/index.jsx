import JoinedGroupCard from "../JoinedGroupCard";

const CustomerGroupsSection = ({ title, groups = [], showAll, setShowAll }) => {
  const displayedGroups = showAll ? groups : groups.slice(0, 4);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {groups?.length > 4 && setShowAll && (
          <button
            type="button"
            className="underline cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View less" : "View all"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {displayedGroups?.length > 0 ? (
          displayedGroups.map((card) => (
            <JoinedGroupCard
              key={card.id}
              title={card.title}
              image={card.image}
              avatars={card.avatars}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center py-6">
            <p className="text-gray-500 text-sm">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerGroupsSection;
