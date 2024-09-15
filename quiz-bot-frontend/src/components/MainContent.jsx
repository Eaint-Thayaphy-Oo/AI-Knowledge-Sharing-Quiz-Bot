import React from "react";
import CategoryPage from "./CategoryPage";
import QuestionPage from "./QuestionPage";
import UsersPage from "./UsersPage";
import ChangePasswordPage from "./ChangePasswordPage";
import ScoresPage from "./ScoresPage";

const MainContent = ({
  selectedMenuItem,
  categories,
  fetchCategories,
  questions,
  fetchQuestions,
  theme,
}) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "Dashboard":
        return <div>Welcome to the Dashboard</div>;
      case "Users":
        return <UsersPage />;
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
        return <ScoresPage />;
      case "Change Password":
        return <ChangePasswordPage />;
      case "Settings":
        return (
          <div>
            <h2>Settings</h2>
            <p>Adjust your preferences here.</p>
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div
      className={`flex-1 p-6 ${
        theme === "light"
          ? "bg-indigo-50 text-indigo-900"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      {renderContent()}
    </div>
  );
};

export default MainContent;
