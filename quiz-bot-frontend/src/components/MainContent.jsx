import React from "react";

const MainContent = ({ selectedMenuItem }) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "Dashboard":
        return <div>Welcome to the Dashboard</div>;
      case "Users":
        return <div>Manage Users</div>;
      case "Categories":
        return <div>Change your Categories</div>;
      case "Questions":
        return <div>Change your Questions</div>;
      case "Score":
        return <div>Your Score</div>;
      case "Change Password":
        return <div>Change your Password</div>;
      case "Settings":
        return <div>Adjust your Settings</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="flex-1 bg-indigo-50 p-6 text-indigo-900">
      <h1 className="text-2xl mb-4">{selectedMenuItem}</h1>
      {renderContent()}
    </div>
  );
};

export default MainContent;
