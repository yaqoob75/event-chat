import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useHeader from "../../hooks/useHeader";
import { ActiveTabSwitch, FilterSelect, SearchInput } from "../../components";
import { LuListFilter } from "react-icons/lu";
import {
  ReusableTable,
  CustomButton,
  UserAvatar,
  StatusBadge,
} from "../../components";
import { formatDate, eventsFilterOptions } from "../../constants/home";
import { useGetAllEventsQuery } from "../../api/apiSlice";
import { useDebounce } from "../../hooks/useDebounce";

const EventsList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = useSelector((state) => state.auth?.user);
  const userId = user?._id;

  const handleToggleFilter = () => {
    setIsFilterVisible((prev) => {
      const newState = !prev;
      if (!newState) {
        setSelectedFilter(null);
      }
      return newState;
    });
  };
  const handleFilterChange = (option) => setSelectedFilter(option);
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const debouncedSearchText = useDebounce(searchText, 1000);

  useHeader({
    isHeader: true,
    headerText: "Events",
  });

  const {
    data: eventsData,
    isLoading,
    isFetching,
  } = useGetAllEventsQuery({
    eventName: debouncedSearchText,
    eventType: selectedFilter?.value,
    page: currentPage,
    limit: 10,
    coHost: activeTab === 1 ? userId : undefined,
  });

  useEffect(() => {
    if (eventsData) {
      setTotalPages(eventsData?.data?.pages || 1);
    }
  }, [eventsData]);

  const eventsList = Array.isArray(eventsData?.data?.events)
    ? eventsData?.data?.events.map((item) => ({
        id: item?._id,
        event: item?.eventName,
        owner: { name: item?.eventName, avatar: item?.image },
        isVerified: true,
        type: item?.eventType,
        // domain: "Group",
        created: formatDate(item.createdAt),
        startDate: formatDate(item.startDate),
        endDate: formatDate(item.endDate),
        status: item.status,
      }))
    : [];

  const columns = [
    { key: "event", label: "Event", sortable: true, isCapitalize: true },
    ...(activeTab === 0
      ? [
          {
            key: "owner",
            label: "Event Owner",
            render: (value) => <UserAvatar user={value} />,
          },
        ]
      : []),
    { key: "type", label: "Event Type", sortable: true },
    // { key: "domain", label: "Domain", sortable: true },
    { key: "created", label: "Created", sortable: true },
    { key: "startDate", label: "Start Date", sortable: true },
    { key: "endDate", label: "End Date", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowClick = (data) => navigate(`/events/event-detail/${data.id}`);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <ActiveTabSwitch
          tabs={["All Events", "My Events"]}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          <CustomButton
            btnTitle="Filters"
            icon={<LuListFilter className="h-5 w-5" strokeWidth={2} />}
            borderRadius="rounded-lg"
            width="w-full sm:w-[8rem]"
            onClick={handleToggleFilter}
            fontWeight="font-semibold"
            hoverClass="hover:bg-gray-100"
          />
          {isFilterVisible && (
            <FilterSelect
              id="filterBy"
              value={selectedFilter}
              options={eventsFilterOptions}
              onSelect={handleFilterChange}
              placeholder="Select..."
              width="w-full sm:w-[14rem]"
            />
          )}
          <SearchInput
            value={searchText}
            onChange={handleSearchChange}
            width="w-full sm:w-[20rem]"
          />
          {activeTab === 1 && (
            <CustomButton
              btnTitle="Add"
              onClick={() => navigate("/events/add-event")}
              borderRadius="rounded-lg"
              backgroundColor="bg-[#181D27]"
              fontColor="text-white"
              fontWeight="font-semibold"
              width="w-fit"
              btnPadding="px-5"
            />
          )}
        </div>
      </div>

      <ReusableTable
        columns={columns}
        data={eventsList}
        isPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        loading={isLoading || isFetching}
      />
    </>
  );
};

export default EventsList;
