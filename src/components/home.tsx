import { useState } from "react";
import Navigation from "./layout/Navigation";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";

function Home() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleGetStarted = () => {
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "dashboard":
        return <Dashboard />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}

export default Home;
