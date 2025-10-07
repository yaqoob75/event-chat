import EventsAttendedCard from "../EventsAttendedCard";

const CustomerEventsSection = ({ title, events = [], showAll, setShowAll }) => {
  const displayedEvents = showAll ? events : events.slice(0, 4);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {events?.length > 4 && setShowAll && (
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
        {displayedEvents?.length > 0 ? (
          displayedEvents.map((event) => (
            <EventsAttendedCard
              key={event.id}
              image={event.image}
              title={event.title}
              subtitle={event.subtitle}
              location={event.location}
              date={event.date}
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

export default CustomerEventsSection;
