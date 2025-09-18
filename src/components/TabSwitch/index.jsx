const TabSwitch = ({ tabs, activeTab = 0, setActiveTab }) => {

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="inline-flex bg-gray-200 rounded-full p-1 space-x-1">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(index)}
          className={`
            px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
            ${
              activeTab === index
                ? "bg-[#8FCFFF] shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
            }
          `}
        >
          {tab.label || tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
