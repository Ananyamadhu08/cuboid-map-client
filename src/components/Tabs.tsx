import React, { useState, ReactNode } from "react";

interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <ul className="rounded-lg text-center text-sm font-medium text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li key={index} className="w-full focus-within:z-10">
            <button
              className={`inline-block w-full border-r border-gray-200 p-4 dark:border-gray-700 ${
                activeTab === index
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-4">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
