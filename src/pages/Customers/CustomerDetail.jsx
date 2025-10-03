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
import {
  customerDetailProfileData,
  customerImgCardData,
  eventsAttendedData,
  getFullName,
} from "../../constants/home";
import { useGetCustomerProfileDetailQuery } from "../../api/apiSlice";

const CustomerDetail = () => {
  const { id } = useParams();
  const tabs = ["Profile", "Events", "Groups"];
  const [activeTab, setActiveTab] = useState(0);

  useHeader({
    isHeader: true,
    headerText: "Customers",
    subHeaderText: "Customer Details",
  });

  const { data: profileData, isLoading: isProfileLoading } =
    useGetCustomerProfileDetailQuery(
      { id },
      {
        skip: activeTab !== 0,
      }
    );

  const profileGroupsData = profileData?.data?.groups.map((item) => ({
    id: item?._id,
    title: item?.groupName || "N/A",
    image: item?.image,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    ],
  }));


  // //   {
  //   id: 1,
  //   image:
  //     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  //   title: "Kiehl's Summer Series",
  //   subtitle: "Kiehl's",
  //   location: "TBA",
  //   date: "Friday 4 March",
  //   time: "6-10pm",
  // },

  const profileEventData = profileData?.data?.events.map((item) => ({
    id: item?._id,
    image: item?.image,
    title: item?.eventName,
    subtitle: item?.eventCategory,
    location: "",
    date:  item?.endDate,
  }));

  return (
    <div>
      <TabSwitch
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 && (
        <>
          {isProfileLoading ? (
            <CustomLoader />
          ) : (
            <>
              {/* Profile Header */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                <div className="flex items-center gap-4 w-[30%]">
                  <ProfileAvatar
                    src={profileData?.data?.user?.profilePicture}
                    alt={profileData?.data?.user?.firstName}
                    size="xl"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 capitalize">
                      {getFullName(profileData?.data?.user)}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3 capitalize">
                      {profileData?.data?.user?.address || "N/A"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed w-[70%]">
                  {customerDetailProfileData.description}
                </p>
              </div>
              {/* Content Area */}
              <div className="px-6 py-2">
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-semibold mb-3 w-[30%]">
                    Interests
                  </h3>
                  <div className="w-[70%]">
                    <TagList tags={profileData?.data?.user?.interests} />
                  </div>
                </div>
                {profileData?.data?.user?.profileAnswer?.map((item, index) => (
                  <CustomerQA
                    key={item._id || index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
              {/* Cards */}
              <div className="px-6 flex gap-8">
                {customerImgCardData.map((card) => (
                  <CustomerImgCard
                    key={card.id}
                    image={card.image}
                    title={card.title}
                    alt={card.alt}
                  />
                ))}
              </div>
              <div className="px-6 border-b border-gray-200 my-4"></div>
              {/* Events attended */}
              <div className="px-6 flex justify-between mt-5">
                <h2 className="text-xl font-semibold">Events attended</h2>
                <button type="button" className="underline cursor-pointer">
                  View all
                </button>
              </div>
              <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
              {/* Joined Groups */}
              <div className="px-6 flex justify-between mt-8">
                <h2 className="text-xl font-semibold">Joined Groups</h2>
                <button type="button" className="underline cursor-pointer">
                  View all
                </button>
              </div>
              <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {profileGroupsData?.map((card) => (
                  <JoinedGroupCard
                    key={card.id}
                    title={card.title}
                    image={card.image}
                    avatars={card.avatars}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {activeTab === 1 && (
        <div className="p-6">
          <h2 className="text-xl font-semibold">Events attended</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
        </div>
      )}

      {activeTab === 2 && (
        <div className="p-6">
          <h2 className="text-xl font-semibold">Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
