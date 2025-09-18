import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import {
  ReusableTable,
  UserAvatar,
  FilterAndSearchHeader,
} from "../../components";

const CustomersList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  useHeader({
    isHeader: true,
    headerText: "Customers",
  });

  const data = [
    {
      customerName: { name: "Olivia Rhye", avatar: "" },
      email: "olivia@untitledui.com",
      phoneNumber: "+34 623 723 234",
      memberType: "Business",
      memberSince: "Jan 6, 2025",
      lastCheckIn: "Jan 6, 2025 11:58",
    },
    {
      customerName: { name: "Phoenix Baker", avatar: "/man-avatar.png" },
      email: "phoenix@untitledui.com",
      phoneNumber: "+34 623 723 234",
      memberType: "Individual",
      memberSince: "Jan 6, 2025",
      lastCheckIn: "Jan 6, 2025 11:58",
    },
    {
      customerName: { name: "Lana Steiner", avatar: "/woman-avatar-2.png" },
      email: "lana@untitledui.com",
      phoneNumber: "+34 623 723 234",
      memberType: "Business",
      memberSince: "Jan 6, 2025",
      lastCheckIn: "Jan 6, 2025 11:58",
    },
    {
      customerName: { name: "Demi Wilkinson", avatar: "/woman-avatar-3.png" },
      email: "demi@untitledui.com",
      phoneNumber: "+34 623 723 234",
      memberType: "Business",
      memberSince: "Jan 6, 2025",
      lastCheckIn: "Jan 6, 2025 11:58",
    },
  ];

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

  const subscriptionFilterOptions = [
    { label: "Business", value: "business" },
    { label: "Individual", value: "individual" },
    { label: "All", value: "all" },
  ];

  const handleRowClick = () => {
    navigate(`/customers/customer-detail`);
  };

  return (
    <div>
      <FilterAndSearchHeader
        title="Customers"
        isFilterVisible={isActiveFilter}
        toggleFilter={() => setIsActiveFilter(!isActiveFilter)}
        selectedFilter={selectedFilter}
        filterOptions={subscriptionFilterOptions}
        onFilterChange={(val) => setSelectedFilter(val)}
        showFilterSelect={true}
        searchText={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />

      <ReusableTable
        columns={columns}
        data={data}
        isPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default CustomersList;
