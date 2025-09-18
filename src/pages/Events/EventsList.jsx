import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import { ActiveTabSwitch, FilterSelect, SearchInput } from "../../components";
import { LuListFilter } from "react-icons/lu";
import {
  ReusableTable,
  CustomButton,
  UserAvatar,
  StatusBadge,
} from "../../components";

const subscriptionFilterOptions = [
  { label: "Business", value: "business" },
  { label: "Individual", value: "individual" },
  { label: "All", value: "all" },
];

const EventsList = () => {
  useHeader({
    isHeader: true,
    headerText: "Events",
  });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = () => setIsFilterVisible((prev) => !prev);

  const handleFilterChange = (option) => setSelectedFilter(option);
  const handleSearchChange = (e) => setSearchText(e.target.value);

  const columns = [
    { key: "event", label: "Event", sortable: true },
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
    { key: "domain", label: "Domain", sortable: true },
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

  const data = [
    {
      id: 1,
      event: "Lorem Ipsum",
      owner: { name: "Olivia Rhye", avatar: "/avatars/olivia.png" },
      isVerified: true,
      type: "Paid",
      domain: "Group",
      created: "Jan 6, 2025 11:58",
      startDate: "Jan 6, 2025",
      endDate: "Jan 6, 2025",
      status: "Active",
    },
    {
      id: 2,
      event: "Lorem Ipsum",
      owner: { name: "Phoenix Baker", avatar: "" },
      isVerified: false,
      type: "Free",
      domain: "Individual",
      created: "Jan 6, 2025 11:58",
      startDate: "Jan 6, 2025",
      endDate: "Jan 6, 2025",
      status: "Active",
    },
    {
      id: 3,
      event: "Lorem Ipsum",
      owner: { name: "Candice Wu", avatar: "/avatars/olivia.png" },
      isVerified: false,
      type: "Free",
      domain: "Group",
      created: "Jan 6, 2025 11:58",
      startDate: "Jan 5, 2025",
      endDate: "Jan 5, 2025",
      status: "Expired",
    },
  ];

  const handleRowClick = () => {
    navigate(`/events/event-detail`);
  };

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
            onClick={toggleFilter}
            fontWeight="font-semibold"
            hoverClass="hover:bg-gray-100"
          />
          {isFilterVisible && (
            <FilterSelect
              id="filterBy"
              value={selectedFilter}
              options={subscriptionFilterOptions}
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
              onClick={()=> navigate("/events/add-event")}
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
        data={data}
        isPagination={true}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default EventsList;
