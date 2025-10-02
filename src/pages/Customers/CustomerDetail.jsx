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
  joinedGroupCardData,
} from "../../constants/home";
import { useGetCustomerProfileDetailQuery } from "../../api/apiSlice";

const CustomerDetail = () => {
  const { id } = useParams();
  console.log("my id", id);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Profile", "Events", "Groups"];
  useHeader({
    isHeader: true,
    headerText: "Customers",
    subHeaderText: "Customer Details",
  });

  const {
    data: profileData,
    isLoading: profileLoading,
  } = useGetCustomerProfileDetailQuery(
    { id },
    {
      skip: activeTab !== 0,
    }
  );

  console.log("profileData:", profileData?.data);

  return (
    <div>
      <TabSwitch
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 && profileLoading ? (
        <CustomLoader />
      ) : activeTab === 0 ? (
        <>
          {/* Profile Header */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 w-[30%]">
              <ProfileAvatar alt={customerDetailProfileData.name} size="xl" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {customerDetailProfileData.name}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {customerDetailProfileData.location}
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
              <h3 className="text-xl font-semibold mb-3 w-[30%]">Interests</h3>
              <div className="w-[70%]">
                <TagList tags={customerDetailProfileData.interests} />
              </div>
            </div>
            {customerDetailProfileData.qa.map((item, index) => (
              <CustomerQA
                key={index}
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
            {joinedGroupCardData.map((card) => (
              <JoinedGroupCard
                key={card.id}
                title={card.title}
                image={card.image}
                avatars={card.avatars}
              />
            ))}
          </div>
        </>
      ) :""}
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
