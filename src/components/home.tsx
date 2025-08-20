import { useState } from "react";
import Navigation from "./layout/Navigation";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";

interface Contract {
  id: string;
  brandName: string;
  influencerName: string;
  dealPrice: number;
  commissionRate: number;
  commissionAmount: number;
  status: string;
  createdAt: Date;
}

function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  const [contracts, setContracts] = useState<Contract[]>([]);

  const handleGetStarted = () => {
    setCurrentPage("dashboard");
  };

  const handleContractCreated = (contract: Contract) => {
    setContracts((prev) => [contract, ...prev]);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "dashboard":
        return (
          <Dashboard
            contracts={contracts}
            onContractCreated={handleContractCreated}
          />
        );
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
