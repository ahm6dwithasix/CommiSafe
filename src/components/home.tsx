import { useState } from "react";
import Navigation from "./layout/Navigation";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";
import LoginDialog from "./auth/LoginDialog";
import { Toaster } from "@/components/ui/toaster";

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
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setCurrentPage("dashboard");
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
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
      <Navigation
        currentPage={currentPage}
        onPageChange={(page) => {
          if (page === "dashboard") {
            handleDashboardClick();
          } else {
            setCurrentPage(page);
          }
        }}
      />
      {renderCurrentPage()}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onLogin={handleLogin}
      />
      <Toaster />
    </div>
  );
}

export default Home;
