import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";
import { useState } from "react";

export default function EnhancedCommissionTracker() {
  const [timeFilter, setTimeFilter] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");

  const commissionStats = {
    totalEarnings: 45230,
    monthlyEarnings: 12500,
    pendingPayments: 3200,
    completedDeals: 24,
    averageCommission: 1885,
    growthRate: 23.5,
  };

  const recentCommissions = [
    {
      id: 1,
      campaign: "FitTrack Pro Launch",
      client: "FitTrack Inc.",
      amount: 2500,
      status: "paid",
      date: "2024-01-15",
      paymentDate: "2024-01-20",
      type: "Performance",
      commission: 15,
      clicks: 1250,
      conversions: 45,
      conversionRate: 3.6,
    },
    {
      id: 2,
      campaign: "Gaming Headset Review",
      client: "AudioGear",
      amount: 1800,
      status: "pending",
      date: "2024-01-18",
      paymentDate: "2024-01-25",
      type: "Fixed",
      commission: 0,
      clicks: 890,
      conversions: 23,
      conversionRate: 2.6,
    },
    {
      id: 3,
      campaign: "Sustainable Fashion",
      client: "EcoWear",
      amount: 3200,
      status: "processing",
      date: "2024-01-12",
      paymentDate: "2024-01-22",
      type: "Performance",
      commission: 20,
      clicks: 2100,
      conversions: 78,
      conversionRate: 3.7,
    },
    {
      id: 4,
      campaign: "Coffee Subscription",
      client: "BrewMaster",
      amount: 1200,
      status: "paid",
      date: "2024-01-10",
      paymentDate: "2024-01-15",
      type: "Performance",
      commission: 12,
      clicks: 650,
      conversions: 18,
      conversionRate: 2.8,
    },
    {
      id: 5,
      campaign: "Mobile Game Launch",
      client: "GameStudio",
      amount: 4200,
      status: "overdue",
      date: "2024-01-05",
      paymentDate: "2024-01-18",
      type: "Fixed",
      commission: 0,
      clicks: 3200,
      conversions: 156,
      conversionRate: 4.9,
    },
    {
      id: 6,
      campaign: "Smart Home Devices",
      client: "TechHome",
      amount: 2800,
      status: "pending",
      date: "2024-01-20",
      paymentDate: "2024-01-28",
      type: "Performance",
      commission: 18,
      clicks: 1450,
      conversions: 52,
      conversionRate: 3.6,
    },
  ];

  const monthlyData = [
    { month: "Aug", earnings: 8500, deals: 12 },
    { month: "Sep", earnings: 9200, deals: 15 },
    { month: "Oct", earnings: 10800, deals: 18 },
    { month: "Nov", earnings: 11500, deals: 20 },
    { month: "Dec", earnings: 12500, deals: 24 },
    { month: "Jan", earnings: 15700, deals: 28 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: {
        variant: "default",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      },
      pending: {
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
      },
      processing: {
        variant: "outline",
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
      },
      overdue: {
        variant: "destructive",
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
      },
    };

    const config = variants[status as keyof typeof variants];
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeColor = (type: string) => {
    return type === "Performance" ? "text-blue-600" : "text-purple-600";
  };

  const filteredCommissions = recentCommissions.filter((commission) => {
    if (statusFilter === "all") return true;
    return commission.status === statusFilter;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Commission Tracker
          </h1>
          <p className="text-gray-600">
            Track your earnings, payments, and campaign performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                ${commissionStats.totalEarnings.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">
                  +{commissionStats.growthRate}% this month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                This Month
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                ${commissionStats.monthlyEarnings.toLocaleString()}
              </div>
              <p className="text-xs text-blue-600 font-medium mt-1">
                {commissionStats.completedDeals} deals completed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                Pending Payments
              </CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">
                ${commissionStats.pendingPayments.toLocaleString()}
              </div>
              <p className="text-xs text-yellow-600 font-medium mt-1">
                3 payments processing
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Avg. Commission
              </CardTitle>
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                ${commissionStats.averageCommission.toLocaleString()}
              </div>
              <p className="text-xs text-purple-600 font-medium mt-1">
                per completed deal
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Earnings Chart */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Earnings Trend
                  </CardTitle>
                  <CardDescription>
                    Monthly earnings and deal completion over time
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Chart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div
                    key={data.month}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 text-sm font-medium text-gray-600">
                        {data.month}
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(data.earnings / 20000) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          ${data.earnings.toLocaleString()}
                        </div>
                        <div className="text-gray-500">{data.deals} deals</div>
                      </div>
                      {index > 0 && (
                        <div className="flex items-center">
                          {data.earnings > monthlyData[index - 1].earnings ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Quick Actions
              </CardTitle>
              <CardDescription>
                Manage your commissions and payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Wallet className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Payment Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <PieChart className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Commission History */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Commission History
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of your earnings and campaign performance
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-40">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {commission.campaign}
                        </div>
                        <div className="text-sm text-gray-500">
                          Campaign #{commission.id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {commission.client}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`font-medium ${getTypeColor(commission.type)}`}
                      >
                        {commission.type}
                        {commission.type === "Performance" && (
                          <div className="text-xs text-gray-500">
                            {commission.commission}% commission
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{commission.clicks.toLocaleString()} clicks</div>
                        <div className="text-gray-500">
                          {commission.conversions} conversions (
                          {commission.conversionRate}%)
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-green-600">
                        ${commission.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(commission.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{commission.paymentDate}</div>
                        <div className="text-gray-500">
                          Campaign: {commission.date}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
