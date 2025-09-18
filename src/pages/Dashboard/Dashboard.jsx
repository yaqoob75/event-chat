import { useState } from "react";
import { FiUsers, FiCheckCircle } from "react-icons/fi";
import { RiHandbagLine } from "react-icons/ri";
import { TfiBackRight } from "react-icons/tfi";
import FilterDatePicker from "../../components/FilterDatePicker";
import {
  DashboardSummaryCard,
  DashboardDonutChart,
  EventAnalyticsChart,
} from "../../components";

const metricsData = [
  {
    title: "Total users",
    value: 89935,
    icon: FiUsers,
    iconColor: "text-black",
    trend: "up",
    trendValue: "100",
    trendPeriod: "this week",
  },
  {
    title: "Total Events",
    value: 23283.5,
    icon: RiHandbagLine,
    iconColor: "text-[#FD8584]",
    trend: "up",
    trendValue: "50",
    trendPeriod: "this week",
  },
  {
    title: "Active Events",
    value: 46827,
    icon: FiCheckCircle,
    iconColor: "text-[#967FF2]",
    trend: "down",
    trendValue: "0",
    trendPeriod: "this week",
  },
  {
    title: "Total Earnings",
    value: "$124,854",
    icon: TfiBackRight,
    iconBgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    trend: "up",
    trendValue: "$1,072",
    trendPeriod: "this week",
  },
];

const customData = [
  {
    month: "Jan",
    fullDate: "15 January 2025",
    paidEvents: 12,
    freeEvents: 28,
    revenue: 42850.75,
  },
  {
    month: "Feb",
    fullDate: "15 February 2025",
    paidEvents: 25,
    freeEvents: 38,
    revenue: 51230.6,
  },
  {
    month: "Mar",
    fullDate: "15 March 2025",
    paidEvents: 55,
    freeEvents: 48,
    revenue: 59492.1,
  },
  {
    month: "Apr",
    fullDate: "15 April 2025",
    paidEvents: 48,
    freeEvents: 68,
    revenue: 47890.25,
  },
  {
    month: "May",
    fullDate: "15 May 2025",
    paidEvents: 40,
    freeEvents: 62,
    revenue: 43567.8,
  },
  {
    month: "Jun",
    fullDate: "15 June 2025",
    paidEvents: 45,
    freeEvents: 72,
    revenue: 48932.4,
  },
  {
    month: "Jul",
    fullDate: "15 July 2025",
    paidEvents: 38,
    freeEvents: 58,
    revenue: 41678.9,
  },
  {
    month: "Aug",
    fullDate: "15 August 2025",
    paidEvents: 62,
    freeEvents: 52,
    revenue: 56234.15,
  },
  {
    month: "Sep",
    fullDate: "15 August 2025",
    paidEvents: 62,
    freeEvents: 52,
    revenue: 56234.15,
  },
  {
    month: "Oct",
    fullDate: "15 August 2025",
    paidEvents: 22,
    freeEvents: 20,
    revenue: 5624.15,
  },
  {
    month: "Nov",
    fullDate: "Nov 2025",
    paidEvents: 62,
    freeEvents: 52,
    revenue: 5624.15,
  },
  {
    month: "Dec",
    fullDate: "15 August 2025",
    paidEvents: 92,
    freeEvents: 82,
    revenue: 56234.15,
  },
];

const Dashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: null,
    end: null,
  });

  const handleDateChange = (newRange) => {
    console.log("Selected date range:", newRange);
    setSelectedDateRange(newRange);
  };

  const chartData = [
    {
      name: "Paid Event",
      value: 55,
      color: "#fb923c", // Orange
    },
    {
      name: "Free Event",
      value: 45,
      color: "#4338ca", // Blue
    },
  ];

  return (
    <div className="px-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold w-fit">Summary</h2>
        <FilterDatePicker
          value={selectedDateRange}
          onChange={handleDateChange}
          placeholder="Select Date Range"
          className="w-[300px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl p-5 border border-[#E6EDFF]">
        {metricsData.map((metric, index) => (
          <DashboardSummaryCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            iconColor={metric.iconColor}
            trend={metric.trend}
            trendValue={metric.trendValue}
            trendPeriod={metric.trendPeriod}
            hasRightBorder={index !== metricsData.length - 1}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 mt-5 min-h-[384px]">
        <div className="flex-1">
          <EventAnalyticsChart
            data={customData}
            title="Event Analytics"
            showYearly={true}
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 h-96">
          <DashboardDonutChart
            data={chartData}
            title="Graph Overview"
            centerText="Overview"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
