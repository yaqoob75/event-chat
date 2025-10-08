import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LuListFilter } from "react-icons/lu";
import useHeader from "../../hooks/useHeader";
import {
  ActiveTabSwitch,
  FilterSelect,
  SearchInput,
  ReusableTable,
  CustomButton,
  UserAvatar,
  StatusBadge,
  CustomLoader,
} from "../../components";
import { subscriptionFilterOptions } from "../../constants/home";
import {
  useGetAllGroupsQuery,
  useGetAllMyGroupsQuery,
} from "../../api/apiSlice";

const GroupsList = () => {
  useHeader({
    isHeader: true,
    headerText: "Groups",
  });

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const toggleFilter = () => setIsFilterVisible((prev) => !prev);
  const handleFilterChange = (option) => setSelectedFilter(option);
  const handleSearchChange = (e) => setSearchText(e.target.value);

  // === API Calls based on tab ===
  const {
    data: allGroupsData,
    isLoading: isAllGroupsLoading,
    isFetching: isAllGroupsFetching,
  } = useGetAllGroupsQuery(
    {
      search: searchText,
      page: currentPage,
      limit,
    },
    { skip: activeTab !== 0 } // skip unless tab 0
  );

  const {
    data: myGroupsData,
    isLoading: isMyGroupsLoading,
    isFetching: isMyGroupsFetching,
  } = useGetAllMyGroupsQuery(
    {
      search: searchText,
      page: currentPage,
      limit,
      id: "123", // optional — replace with logged-in user ID if needed
    },
    { skip: activeTab !== 1 } // skip unless tab 1
  );

  const loading =
    isAllGroupsLoading ||
    isMyGroupsLoading ||
    isAllGroupsFetching ||
    isMyGroupsFetching;

  // === Combine table data dynamically ===
  const apiData = useMemo(() => {
    const fetchedData =
      activeTab === 0
        ? allGroupsData?.data || []
        : myGroupsData?.data || [];

    // transform into the format table expects
    return fetchedData.map((group) => ({
      id: group?._id,
      group: group?.groupName || "N/A",
      owner: {
        name: group?.ownerName || "Unknown",
        avatar: group?.ownerAvatar || "",
      },
      groupType: group?.groupType || "N/A",
      category: group?.category || "N/A",
      created: group?.createdAt
        ? new Date(group.createdAt).toLocaleString()
        : "N/A",
      status: group?.status || "Active",
    }));
  }, [activeTab, allGroupsData, myGroupsData]);

  const columns = [
    { key: "group", label: "Group", sortable: true },
    ...(activeTab === 0
      ? [
          {
            key: "owner",
            label: "Event Owner",
            render: (value) => <UserAvatar user={value} />,
          },
        ]
      : []),
    { key: "groupType", label: "Group Type", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "created", label: "Created", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/groups/group-detail/${row.id}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <ActiveTabSwitch
          tabs={["All Groups", "My Groups"]}
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
              onClick={() => navigate("/groups/add-group")}
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

      {loading ? (
        <CustomLoader />
      ) : (
        <ReusableTable
          columns={columns}
          data={apiData}
          isPagination={true}
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
          onRowClick={handleRowClick}
        />
      )}
    </>
  );
};

export default GroupsList;
