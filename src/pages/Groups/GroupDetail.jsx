import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { FaPoll } from "react-icons/fa";
import {
  ActiveTabSwitch,
  SearchInput,
  CustomButton,
  EventsAttendedCard,
  PostCard,
} from "../../components";
import { eventsAttendedData, postsData } from "../../constants/home";

const GroupDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => setSearchText(e.target.value);

  return (
    <div>
      <ActiveTabSwitch
        tabs={["Feed", "Events"]}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 0 && (
        <>
          <div className="flex items-center gap-2 mt-8">
            <CustomButton
              btnTitle="Post your media"
              type="button"
              onClick={() => navigate("/groups/add-new-post")}
              backgroundColor="bg-[#8FCFFF]"
              borderRadius="rounded-full"
              fontWeight="font-medium"
              width="w-fit"
              btnPadding="px-4"
              hoverClass="hover:bg-[#67abdf]"
              icon={<FaRegImage className="h-5 w-5" />}
            />
            <CustomButton
              btnTitle="Create a poll"
              type="button"
              onClick={() => navigate("/groups/add-new-poll")}
              fontColor="text-[#27AE60]"
              backgroundColor="bg-[#D4EFDF]"
              borderRadius="rounded-full"
              fontWeight="font-medium"
              width="w-fit"
              btnPadding="px-4"
              hoverClass="hover:bg-green-100"
              icon={<FaPoll className="h-5 w-5 text-[#27AE600]" />}
            />
          </div>
          <div className="mt-6 space-y-8">
            {postsData.map((post, idx) => (
              <PostCard key={idx} post={post} />
            ))}
          </div>
        </>
      )}
      {activeTab === 1 && (
        <>
          <div className="flex justify-end">
            <SearchInput
              value={searchText}
              onChange={handleSearchChange}
              width="w-full sm:w-[20rem]"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <h2 className="text-xl font-semibold">All Events</h2>
            <CustomButton
              btnTitle="Add Event"
              type="button"
              onClick={() => navigate("/events/add-event")}
              fontColor="text-black"
              backgroundColor="bg-[#8FCFFF]"
              borderRadius="rounded-full"
              width="w-fit"
              btnPadding="px-4"
              hoverClass="hover:bg-[#67abdf]"
              icon={<FaPlus />}
            />
          </div>
          <div className="px-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {eventsAttendedData.map((event) => (
              <EventsAttendedCard
                key={event.id}
                image={event.image}
                title={event.title}
                subtitle={event.subtitle}
                location={event.location}
                date={event.date}
                time={event.time}
                className="hover:shadow-lg transition-shadow duration-300"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetail;
