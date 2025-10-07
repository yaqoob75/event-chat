import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import {
  ReusableTable,
  UserAvatar,
  FilterAndSearchHeader,
} from "../../components";
import {
  customerFilterOptions,
  formatDate,
  formatMemberType,
} from "../../constants/home";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetAllCustomersQuery } from "../../api/apiSlice";

const CustomersList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 1000);

  useHeader({
    isHeader: true,
    headerText: "Customers",
  });

  const {
    data: customersData,
    isLoading,
    isFetching,
  } = useGetAllCustomersQuery({
    search: debouncedSearchText,
    role: selectedFilter?.value || "",
    page: currentPage,
    limit: 10,
  });

  useEffect(() => {
    if (customersData) {
      setTotalPages(customersData?.data?.pagination?.totalPages);
    }
  }, [customersData]);

  const customers = Array.isArray(customersData?.data?.users)
    ? customersData?.data?.users.map((item) => {
        const fullName = [item?.firstName, item?.lastName]
          .filter(Boolean)
          .join(" ");
        return {
          id: item?._id,
          customerName: {
            name: fullName || "N/A",
            avatar: item?.profilePicture,
          },
          email: item?.email || "N/A",
          phoneNumber: item?.phoneNumber || "N/A",
          memberType: formatMemberType(item?.role),
          memberSince: formatDate(item?.createdAt),
          lastCheckIn: item?.lastCheckIn || "N/A",
        };
      })
    : [];

  const columns = [
    {
      key: "customerName",
      label: "Customer",
      sortable: false,
      render: (value) => <UserAvatar user={value} />,
    },
    { key: "email", label: "Email", sortable: true },
    { key: "phoneNumber", label: "Phone Number", sortable: true },
    { key: "memberType", label: "Member Type", sortable: true },
    { key: "memberSince", label: "Member Since", sortable: true },
    { key: "lastCheckIn", label: "Last Check in", sortable: true },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (data) => {
    navigate(`/customers/customer-detail/${data.id}`);
  };

  const handleToggleFilter = () => {
    setIsActiveFilter((prev) => {
      const newState = !prev;
      if (!newState) {
        setSelectedFilter(null);
      }
      return newState;
    });
  };

  return (
    <div>
      <FilterAndSearchHeader
        title="Customers"
        isFilterVisible={isActiveFilter}
        toggleFilter={handleToggleFilter}
        selectedFilter={selectedFilter}
        filterOptions={customerFilterOptions}
        onFilterChange={(val) => setSelectedFilter(val)}
        showFilterSelect={true}
        searchText={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <ReusableTable
        columns={columns}
        data={customers}
        isPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default CustomersList;
