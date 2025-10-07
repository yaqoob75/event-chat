import { useState, useEffect, useMemo } from "react";
import useHeader from "../../hooks/useHeader";
import { useParams } from "react-router-dom";
import {
  TabSwitch,
  CustomLoader,
  CustomerProfileSection,
  CustomerProfileImages,
  CustomerEventsSection,
  CustomerGroupsSection,
} from "../../components";
import { formatEventDate } from "../../constants/home";
import { useGetCustomerDetailQuery } from "../../api/apiSlice";
import { getLocationName } from "../../utils/Helper";

const CustomerDetail = () => {
  const { id } = useParams();
  const tabs = ["Profile", "Events", "Groups"];
  const [activeTab, setActiveTab] = useState(0);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [eventLocations, setEventLocations] = useState({});

  useHeader({
    isHeader: true,
    headerText: "Customers",
    subHeaderText: "Customer Details",
  });

  const { data, isLoading, isFetching } = useGetCustomerDetailQuery(
    activeTab === 1
      ? { id, event: 1 }
      : activeTab === 2
      ? { id, group: 1 }
      : { id },
    { skip: !id }
  );

  const profileData = data?.data || {};
  const user = profileData?.user || {};

  const events = useMemo(
    () => profileData?.events || [],
    [profileData?.events]
  );
  const groups = useMemo(
    () => profileData?.groups || [],
    [profileData?.groups]
  );

  useEffect(() => {
    if (!events.length) return;

    const fetchLocations = async () => {
      const locationPromises = events.map(async (item) => {
        const locationName = await getLocationName(item?.location);
        return { id: item?._id, name: locationName };
      });

      const resolvedLocations = await Promise.all(locationPromises);
      const locationsMap = resolvedLocations.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
      }, {});

      setEventLocations(locationsMap);
    };

    fetchLocations();
  }, [events]);

  const formattedEvents = useMemo(
    () =>
      events.map((item) => ({
        id: item?._id,
        image: item?.image,
        title: item?.eventName || "N/A",
        subtitle: item?.eventType || "N/A",
        location: eventLocations[item?._id] || "Location TBA",
        date: formatEventDate(item?.endDate),
      })),
    [events, eventLocations]
  );

  const formattedGroups = useMemo(
    () =>
      groups.map((item) => ({
        id: item?._id,
        title: item?.groupName || "N/A",
        image: item?.image,
        avatars: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?...",
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?...",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?...",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?...",
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?...",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?...",
        ],
      })),
    [groups]
  );

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
              <CustomerProfileSection user={user} />
              <CustomerProfileImages user={user} />
              <CustomerEventsSection
                title="Events attended"
                events={formattedEvents}
                showAll={showAllEvents}
                setShowAll={setShowAllEvents}
              />
              <CustomerGroupsSection
                title="Joined Groups"
                groups={formattedGroups}
                showAll={showAllGroups}
                setShowAll={setShowAllGroups}
              />
            </>
          )}

          {activeTab === 1 && (
            <CustomerEventsSection
              title="Events attended"
              events={formattedEvents}
            />
          )}

          {activeTab === 2 && (
            <CustomerGroupsSection title="Groups" groups={formattedGroups} />
          )}
        </>
      )}
    </div>
  );
};

export default CustomerDetail;
