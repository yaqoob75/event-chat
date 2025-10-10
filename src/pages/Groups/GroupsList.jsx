import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "../../components";
import { eventsFilterOptions, groupDateFormat } from "../../constants/home";
import { useDebounce } from "../../hooks/useDebounce";
import {
  useGetAllGroupsQuery,
  useGetAllMyGroupsQuery,
} from "../../api/apiSlice";

const GroupsList = () => {
  useHeader({
    isHeader: true,
    headerText: "Groups",
  });

  const user = useSelector((state) => state.auth?.user);
  const userId = user?._id;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState([]);
  const limit = 10;
  const debouncedSearchText = useDebounce(searchText, 1000);

  const toggleFilter = () => setIsFilterVisible((prev) => !prev);
  const handleFilterChange = (option) => setSelectedFilter(option);
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);

  // === API Calls based on tab ===
  const {
    data: allGroupsData,
    isLoading: isAllGroupsLoading,
    isFetching: isAllGroupsFetching,
  } = useGetAllGroupsQuery(
    {
      groupName: debouncedSearchText,
      groupType: selectedFilter?.value || "",
      page: currentPage,
      limit,
    },
    { skip: activeTab !== 0 }
  );

  const {
    data: myGroupsData,
    isLoading: isMyGroupsLoading,
    isFetching: isMyGroupsFetching,
  } = useGetAllMyGroupsQuery(
    {
      search: debouncedSearchText,
      page: currentPage,
      limit,
      id: userId,
    },
    { skip: activeTab !== 1 }
  );

  const loading =
    isAllGroupsLoading ||
    isMyGroupsLoading ||
    isAllGroupsFetching ||
    isMyGroupsFetching;

  useEffect(() => {
    let responseData = activeTab === 0 ? allGroupsData : myGroupsData;
    let fetchedData = responseData?.data?.groups;

    if (!Array.isArray(fetchedData)) {
      fetchedData = responseData?.data?.groups?.items || [];
    }
    if (!Array.isArray(fetchedData)) fetchedData = [];

    const paginationInfo = responseData?.data?.pagination;
    if (paginationInfo) {
      setTotalPages(Number(paginationInfo.totalPages) || 1);
      setCurrentPage(Number(paginationInfo.currentPage) || 1);
    }

    const formattedData = fetchedData.map((group) => ({
      id: group?._id,
      group: group?.groupName || "N/A",
      coHost: {
        name: group?.coHOst?.[0]?.firstName || "N/A",
        avatar: group?.coHOst?.[0]?.profilePicture || "",
      },
      groupType: group?.groupType || "N/A",
      category: Array.isArray(group?.groupCategory)
        ? group.groupCategory.length > 0
          ? group.groupCategory.join(", ")
          : "N/A"
        : group?.groupCategory
        ? group.groupCategory
        : "N/A",
      created: groupDateFormat(group?.createdAt),
    }));

    setTableData(formattedData);
  }, [activeTab, allGroupsData, myGroupsData]);

  const columns = [
    { key: "group", label: "Group", sortable: true, isCapitalize: true },
    {
      key: "coHost",
      label: "Group CoHost",
      render: (value) => <UserAvatar user={value} />,
    },
    { key: "groupType", label: "Group Type", sortable: true },
    { key: "category", label: "Category", sortable: true, isCapitalize: true },
    { key: "created", label: "Created", sortable: true },
    // {
    //   key: "status",
    //   label: "Status",
    //   sortable: true,
    //   render: (value) => <StatusBadge status={value} />,
    // },
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
          onChange={(index) => {
            setActiveTab(index);
            setCurrentPage(1);
          }}
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
      <ReusableTable
        columns={columns}
        data={tableData}
        isPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        loading={loading}
      />
    </>
  );
};

export default GroupsList;
