import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Calendar,
  BarChart3,
  CreditCard,
  User,
  Mail,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import CreateContractDialog from "@/components/contracts/CreateContractDialog";
import { useToast } from "@/components/ui/use-toast";

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

interface DashboardProps {
  contracts?: Contract[];
  onContractCreated?: (contract: Contract) => void;
}

export default function Dashboard({
  contracts = [],
  onContractCreated = () => {},
}: DashboardProps) {
  const [showCreateContract, setShowCreateContract] = useState(false);
  const [showAddInfluencer, setShowAddInfluencer] = useState(false);
  const [showProcessPayment, setShowProcessPayment] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showContractDetails, setShowContractDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState("7d");
  const { toast } = useToast();

  const getAnalyticsData = (timeframe: string) => {
    const data = {
      "7d": {
        influencers: { value: "24", change: "+12%" },
        contracts: { value: contracts.length.toString(), change: "+8%" },
        commissions: { value: "$45,230", change: "+23%" },
        conversion: { value: "12.5%", change: "+5%" },
        chartData: [65, 78, 82, 95, 88, 92, 105],
      },
      "30d": {
        influencers: { value: "89", change: "+18%" },
        contracts: { value: (contracts.length * 4).toString(), change: "+15%" },
        commissions: { value: "$182,450", change: "+31%" },
        conversion: { value: "14.2%", change: "+8%" },
        chartData: [45, 52, 68, 74, 82, 95, 105, 98, 112, 125, 138, 142],
      },
      "90d": {
        influencers: { value: "156", change: "+25%" },
        contracts: { value: (contracts.length * 8).toString(), change: "+22%" },
        commissions: { value: "$524,890", change: "+42%" },
        conversion: { value: "16.8%", change: "+12%" },
        chartData: [25, 35, 45, 52, 68, 74, 82, 95, 105, 98, 112, 125],
      },
    };
    return data[timeframe as keyof typeof data] || data["7d"];
  };

  const currentData = getAnalyticsData(analyticsTimeframe);

  const stats = [
    {
      title: "Active Influencers",
      value: currentData.influencers.value,
      change: currentData.influencers.change,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Contracts",
      value: currentData.contracts.value,
      change: currentData.contracts.change,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Total Commissions",
      value: currentData.commissions.value,
      change: currentData.commissions.change,
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: currentData.conversion.value,
      change: currentData.conversion.change,
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const handleAddInfluencer = (formData: any) => {
    toast({
      title: "Influencer Added Successfully!",
      description: `${formData.name} has been added to your network.`,
    });
    setShowAddInfluencer(false);
  };

  const handleProcessPayment = (paymentData: any) => {
    toast({
      title: "Payment Processed!",
      description: `Payment of ${paymentData.amount} has been processed successfully.`,
    });
    setShowProcessPayment(false);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowContractDetails(true);
  };

  const recentActivity = [
    {
      id: 1,
      type: "contract",
      message: "New contract signed with @fashionista_jane",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "commission",
      message: "Commission payment of $1,250 processed for @tech_reviewer",
      time: "4 hours ago",
      status: "success",
    },
    {
      id: 3,
      type: "pending",
      message: "Contract renewal pending for @lifestyle_blogger",
      time: "1 day ago",
      status: "warning",
    },
    {
      id: 4,
      type: "influencer",
      message: "New influencer application from @fitness_guru",
      time: "2 days ago",
      status: "info",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with your influencer
            partnerships.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-green-600 font-medium">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity & Contracts */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {contracts.length > 0
                      ? "Active Contracts"
                      : "Recent Activity"}
                  </CardTitle>
                  <CardDescription>
                    {contracts.length > 0
                      ? "Your current commission agreements"
                      : "Latest updates from your influencer campaigns"}
                  </CardDescription>
                </div>
                {contracts.length > 0 && (
                  <Badge variant="secondary">{contracts.length} Active</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {contracts.length > 0 ? (
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {contract.brandName} × {contract.influencerName}
                          </h4>
                          <Badge
                            variant={
                              contract.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {contract.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          ${contract.commissionAmount.toLocaleString()}{" "}
                          commission ({contract.commissionRate}% of $
                          {contract.dealPrice.toLocaleString()})
                        </p>
                        <p className="text-xs text-gray-500">
                          Created {contract.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewContract(contract)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                    >
                      {getStatusIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setShowAddInfluencer(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Influencer
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setShowCreateContract(true)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Create Contract
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setShowProcessPayment(true)}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setShowAnalytics(true)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateContractDialog
        open={showCreateContract}
        onOpenChange={setShowCreateContract}
        onContractCreated={onContractCreated}
      />

      {/* Add New Influencer Sheet */}
      <Sheet open={showAddInfluencer} onOpenChange={setShowAddInfluencer}>
        <SheetContent className="bg-white w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Add New Influencer
            </SheetTitle>
            <SheetDescription>
              Add a new influencer to your network
            </SheetDescription>
          </SheetHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddInfluencer({
                name: formData.get("name"),
                email: formData.get("email"),
                platform: formData.get("platform"),
                followers: formData.get("followers"),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Jane Smith" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="platform">Primary Platform</Label>
              <Select name="platform" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="followers">Followers</Label>
              <Input
                id="followers"
                name="followers"
                type="number"
                placeholder="50000"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddInfluencer(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Influencer</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Process Payment Sheet */}
      <Sheet open={showProcessPayment} onOpenChange={setShowProcessPayment}>
        <SheetContent className="bg-white w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              Process Payment
            </SheetTitle>
            <SheetDescription>Process a commission payment</SheetDescription>
          </SheetHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleProcessPayment({
                contract: formData.get("contract"),
                amount: formData.get("amount"),
                method: formData.get("method"),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="contract">Contract</Label>
              <Select name="contract" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.brandName} × {contract.influencerName}
                    </SelectItem>
                  ))}
                  {contracts.length === 0 && (
                    <SelectItem value="demo">Demo Contract - $2,500</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="2500"
                required
              />
            </div>
            <div>
              <Label htmlFor="method">Payment Method</Label>
              <Select name="method" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProcessPayment(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Process Payment</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Analytics Sheet */}
      <Sheet open={showAnalytics} onOpenChange={setShowAnalytics}>
        <SheetContent className="bg-white w-[600px] sm:w-[800px] max-w-[90vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Analytics Dashboard
            </SheetTitle>
            <SheetDescription>
              Detailed performance metrics and insights
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Label htmlFor="timeframe">Time Period:</Label>
              <Select
                value={analyticsTimeframe}
                onValueChange={setAnalyticsTimeframe}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                        <span className="text-xs text-green-600 font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-gray-600">
                          {stat.title}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>Commission trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end space-x-2">
                  {currentData.chartData.map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-green-100 rounded-t"
                      style={{
                        height: `${(value / Math.max(...currentData.chartData)) * 100}%`,
                      }}
                    >
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: "80%" }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {analyticsTimeframe === "7d" &&
                    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => <span key={day}>{day}</span>,
                    )}
                  {analyticsTimeframe === "30d" &&
                    Array.from({ length: 12 }, (_, i) => (
                      <span key={i}>Week {i + 1}</span>
                    ))}
                  {analyticsTimeframe === "90d" &&
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month) => <span key={month}>{month}</span>)}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Influencers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: "@fashionista_jane",
                        earnings: "$12,450",
                        growth: "+25%",
                      },
                      {
                        name: "@tech_reviewer",
                        earnings: "$8,920",
                        growth: "+18%",
                      },
                      {
                        name: "@lifestyle_blogger",
                        earnings: "$6,780",
                        growth: "+12%",
                      },
                      {
                        name: "@fitness_guru",
                        earnings: "$5,340",
                        growth: "+8%",
                      },
                    ].map((influencer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded bg-gray-50"
                      >
                        <span className="font-medium">{influencer.name}</span>
                        <div className="text-right">
                          <div className="font-semibold">
                            {influencer.earnings}
                          </div>
                          <div className="text-xs text-green-600">
                            {influencer.growth}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        platform: "Instagram",
                        percentage: 45,
                        icon: Instagram,
                        color: "bg-pink-500",
                      },
                      {
                        platform: "YouTube",
                        percentage: 30,
                        icon: Youtube,
                        color: "bg-red-500",
                      },
                      {
                        platform: "Twitter",
                        percentage: 15,
                        icon: Twitter,
                        color: "bg-blue-500",
                      },
                      {
                        platform: "TikTok",
                        percentage: 10,
                        icon: Users,
                        color: "bg-black",
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Icon className="h-5 w-5" />
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                {item.platform}
                              </span>
                              <span className="text-sm text-gray-600">
                                {item.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${item.color} h-2 rounded-full`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Contract Details Dialog */}
      <Dialog open={showContractDetails} onOpenChange={setShowContractDetails}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              Contract Details
            </DialogTitle>
            <DialogDescription>
              Complete contract information and status
            </DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-800">
                      Brand
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">
                      {selectedContract.brandName}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-800">
                      Influencer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">
                      {selectedContract.influencerName}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Financial Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Deal Value
                        </TableCell>
                        <TableCell className="text-right">
                          ${selectedContract.dealPrice.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Commission Rate
                        </TableCell>
                        <TableCell className="text-right">
                          {selectedContract.commissionRate}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Commission Amount
                        </TableCell>
                        <TableCell className="text-right font-semibold text-green-600">
                          ${selectedContract.commissionAmount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Contract Status</p>
                  <p className="text-sm text-gray-600">
                    Created {selectedContract.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={
                    selectedContract.status === "Active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {selectedContract.status}
                </Badge>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowContractDetails(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Contract Updated",
                      description:
                        "Contract status has been updated successfully.",
                    });
                    setShowContractDetails(false);
                  }}
                >
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
