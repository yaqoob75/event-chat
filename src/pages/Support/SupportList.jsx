import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHeader from "../../hooks/useHeader";
import {
  ReusableTable,
  UserAvatar,
  StatusBadge,
  FilterAndSearchHeader,
} from "../../components";

const SupportList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  useHeader({
    isHeader: true,
    headerText: "Support",
  });

  const data = [
    {
      customerName: { name: "Olivia Rhye", avatar: "" },
      eventAdmin: { name: "Olivia Rhye", avatar: "" },
      requestType: "Lorem Ipsum",
      price: "$50",
      domain: "Group",
      created: "Jan 6, 2025 11:58",
      modified: "Jan 6, 2025",
      status: "Active",
    },
    {
      customerName: { name: "Phoenix Baker", avatar: "/man-avatar.png" },
      eventAdmin: { name: "Phoenix Baker", avatar: "/man-avatar.png" },
      requestType: "Lorem Ipsum",
      price: "$50",
      domain: "Individual",
      created: "Jan 6, 2025 11:58",
      modified: "Jan 6, 2025",
      status: "Inactive",
    },
    {
      customerName: { name: "Lana Steiner", avatar: "/woman-avatar-2.png" },
      eventAdmin: { name: "Lana Steiner", avatar: "/woman-avatar-2.png" },
      requestType: "Lorem Ipsum",
      price: "$50",
      domain: "Group",
      created: "Jan 6, 2025 11:58",
      modified: "Jan 6, 2025",
      status: "Inactive",
    },
    {
      customerName: { name: "Demi Wilkinson", avatar: "/woman-avatar-3.png" },
      eventAdmin: { name: "Lana Steiner", avatar: "/woman-avatar-2.png" },
      requestType: "Lorem Ipsum",
      price: "$50",
      domain: "Individual",
      created: "Jan 6, 2025 11:58",
      modified: "Jan 6, 2025",
      status: "Inactive",
    },
  ];

  const columns = [
    {
      key: "customerName",
      label: "Customer Name",
      sortable: false,
      render: (value) => <UserAvatar user={value} />,
    },
    {
      key: "eventAdmin",
      label: "Event Admin",
      sortable: false,
      render: (value) => <UserAvatar user={value} />,
    },
    { key: "requestType", label: "Request Type", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "domain", label: "Domain", sortable: true },
    { key: "created", label: "Created", sortable: true },
    { key: "modified", label: "Modified", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
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
    navigate(`/support/ticket-detail`);
  };

  return (
    <div>
      <FilterAndSearchHeader
        title="Support Tickets"
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

export default SupportList;
