import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Home, CheckCircle, BarChart3 } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navigation({
  currentPage = "dashboard",
  onPageChange,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: BarChart3, highlight: true },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">CommiSafe</span>
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-800"
            >
              Secure Commissions
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => handlePageChange(item.id)}
                  className={`flex items-center space-x-2 ${
                    item.highlight
                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                      : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      Pro
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => handlePageChange(item.id)}
                    className={`flex items-center justify-start space-x-2 w-full ${
                      item.highlight
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.highlight && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        Pro
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
