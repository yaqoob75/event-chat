import { useState } from "react";
import useHeader from "../../hooks/useHeader";
import { useParams } from "react-router-dom";
import {
  TabSwitch,
  TagList,
  CustomerQA,
  ProfileAvatar,
  CustomerImgCard,
  EventsAttendedCard,
  JoinedGroupCard,
  CustomLoader,
} from "../../components";
import { formatEventDate, getFullName } from "../../constants/home";
import { useGetCustomerDetailQuery } from "../../api/apiSlice";

const CustomerDetail = () => {
  const { id } = useParams();
  const tabs = ["Profile", "Events", "Groups"];
  const [activeTab, setActiveTab] = useState(0);

  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false);

  useHeader({
    isHeader: true,
    headerText: "Customers",
    subHeaderText: "Customer Details",
  });

  // Conditionally handle API
  const { data, isLoading, isFetching } = useGetCustomerDetailQuery(
    activeTab === 1
      ? { id, event: 1 }
      : activeTab === 2
      ? { id, group: 1 }
      : { id },
    {
      skip: !id,
    }
  );

  const profileData = data?.data;
  const events = profileData?.events || [];
  const groups = profileData?.groups || [];
  const user = profileData?.user || {};

  // Profile data
  const customerImges = user?.imageDetail?.map((item) => ({
    id: item?._id,
    image: item?.image,
    title: item?.description,
    alt: "Icon",
  }));

  // Map event data
  const profileEventData = events.map((item) => ({
    id: item?._id,
    image: item?.image,
    title: item?.eventName || "N/A",
    subtitle: item?.eventType || "N/A",
    location: "TBA",
    date: formatEventDate(item?.endDate),
    time: "6-10pm",
  }));

  const displayedEvents = showAllEvents
    ? profileEventData
    : profileEventData.slice(0, 4);

  // Map groups
  const profileGroupsData = groups.map((item) => ({
    id: item?._id,
    title: item?.groupName || "N/A",
    image: item?.image,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?...",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?...",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?...",
    ],
  }));

  const displayedGroups = showAllGroups
    ? profileGroupsData
    : profileGroupsData.slice(0, 4);

  return (
    <div>
      <TabSwitch
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {isLoading || isFetching ? (
        <CustomLoader />
      ) : (
        <>
          {activeTab === 0 && (
            <>
              {/* ===== Profile Header ===== */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                <div className="flex items-center gap-4 w-[30%]">
                  <ProfileAvatar
                    src={user?.profilePicture}
                    alt={user?.firstName}
                    size="xl"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 capitalize">
                      {getFullName(user)}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3 capitalize">
                      {user?.address || "N/A"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed w-[70%]">
                  {user?.role}
                </p>
              </div>

              {/* ===== Interests ===== */}
              <div className="px-6 py-2">
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-semibold mb-3 w-[30%]">
                    Interests
                  </h3>
                  <div className="w-[70%]">
                    {user?.interests?.length > 0 ? (
                      <TagList tags={user.interests} />
                    ) : (
                      <p className="text-gray-500 text-sm text-center">
                        No data available
                      </p>
                    )}
                  </div>
                </div>

                {user?.profileAnswer?.length > 0 ? (
                  user.profileAnswer.map((item, index) => (
                    <CustomerQA
                      key={item._id || index}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center mb-6">
                    No data available
                  </p>
                )}
              </div>

              {/* ===== Cards ===== */}
              <div className="px-6 grid grid-cols-3 gap-8">
                {customerImges?.length > 0 ? (
                  customerImges.map((card) => (
                    <CustomerImgCard
                      key={card.id}
                      image={card.image}
                      title={card.title}
                      alt={card.alt}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center">
                    No data available
                  </p>
                )}
              </div>

              <div className="px-6 border-b border-gray-200 my-4"></div>

              {/* ===== Events attended ===== */}
              <div className="px-6 flex justify-between mt-5">
                <h2 className="text-xl font-semibold">Events attended</h2>
                {profileEventData?.length > 4 && (
                  <button
                    type="button"
                    className="underline cursor-pointer"
                    onClick={() => setShowAllEvents(!showAllEvents)}
                  >
                    {showAllEvents ? "View less" : "View all"}
                  </button>
                )}
              </div>
              <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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

              {/* ===== Joined Groups ===== */}
              <div className="px-6 flex justify-between mt-8">
                <h2 className="text-xl font-semibold">Joined Groups</h2>
                {profileGroupsData?.length > 4 && (
                  <button
                    type="button"
                    className="underline cursor-pointer"
                    onClick={() => setShowAllGroups(!showAllGroups)}
                  >
                    {showAllGroups ? "View less" : "View all"}
                  </button>
                )}
              </div>
              <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
            </>
          )}

          {/* ===== Events Tab ===== */}
          {activeTab === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold">Events attended</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {profileEventData?.length > 0 ? (
                  profileEventData.map((event) => (
                    <EventsAttendedCard
                      key={event.id}
                      image={event.image}
                      title={event.title}
                      subtitle={event.subtitle}
                      location={event.location}
                      date={event.date}
                      time={event.time}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex justify-center py-15">
                    <p className="text-gray-500 text-base font-semibold text-center">
                      No data available
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== Groups Tab ===== */}
          {activeTab === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold">Groups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {profileGroupsData?.length > 0 ? (
                  profileGroupsData.map((card) => (
                    <JoinedGroupCard
                      key={card.id}
                      title={card.title}
                      image={card.image}
                      avatars={card.avatars}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex justify-center py-15">
                    <p className="text-gray-500 text-base font-semibold text-center">
                      No data available
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerDetail;
