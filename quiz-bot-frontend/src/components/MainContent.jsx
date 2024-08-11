import React from "react";
import CategoryPage from "./CategoryPage";
import QuestionPage from "./QuestionPage";

const MainContent = ({
  selectedMenuItem,
  categories,
  fetchCategories,
  questions,
  fetchQuestions,
}) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "Dashboard":
        return <div>Welcome to the Dashboard</div>;
      case "Users":
        return <div>Manage Users</div>;
      case "Categories":
        return (
          <CategoryPage
            categories={categories}
            fetchCategories={fetchCategories}
          />
        );
      case "Questions":
        return (
          <QuestionPage questions={questions} fetchQuestions={fetchQuestions} />
        );
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
      {/* <h1 className="text-2xl mb-4">{selectedMenuItem}</h1> */}
      {renderContent()}
    </div>
  );
};

export default MainContent;
