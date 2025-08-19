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
import { Input } from "@/components/ui/input";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  DollarSign,
  Search,
  Filter,
  Star,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export default function InfluencerLeaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("month");

  const topInfluencers = [
    {
      id: 1,
      rank: 1,
      name: "Sarah Johnson",
      handle: "@fashionista_sarah",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      category: "Fashion",
      totalEarnings: 45230,
      monthlyEarnings: 12500,
      followers: "2.3M",
      engagementRate: 8.5,
      completedDeals: 24,
      rating: 4.9,
      platforms: ["instagram", "youtube"],
      growth: "+23%",
      tier: "platinum",
    },
    {
      id: 2,
      rank: 2,
      name: "Mike Chen",
      handle: "@tech_reviewer_mike",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      category: "Technology",
      totalEarnings: 38750,
      monthlyEarnings: 11200,
      followers: "1.8M",
      engagementRate: 9.2,
      completedDeals: 18,
      rating: 4.8,
      platforms: ["youtube", "twitter"],
      growth: "+18%",
      tier: "gold",
    },
    {
      id: 3,
      rank: 3,
      name: "Emma Davis",
      handle: "@lifestyle_emma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      category: "Lifestyle",
      totalEarnings: 32100,
      monthlyEarnings: 9800,
      followers: "1.5M",
      engagementRate: 7.8,
      completedDeals: 21,
      rating: 4.7,
      platforms: ["instagram", "youtube", "twitter"],
      growth: "+15%",
      tier: "gold",
    },
    {
      id: 4,
      rank: 4,
      name: "Alex Rodriguez",
      handle: "@fitness_alex",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      category: "Fitness",
      totalEarnings: 28900,
      monthlyEarnings: 8500,
      followers: "1.2M",
      engagementRate: 10.1,
      completedDeals: 16,
      rating: 4.9,
      platforms: ["instagram", "youtube"],
      growth: "+28%",
      tier: "gold",
    },
    {
      id: 5,
      rank: 5,
      name: "Jessica Park",
      handle: "@beauty_jess",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      category: "Beauty",
      totalEarnings: 25600,
      monthlyEarnings: 7800,
      followers: "980K",
      engagementRate: 8.9,
      completedDeals: 19,
      rating: 4.6,
      platforms: ["instagram", "twitter"],
      growth: "+12%",
      tier: "silver",
    },
    {
      id: 6,
      rank: 6,
      name: "David Kim",
      handle: "@food_david",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      category: "Food",
      totalEarnings: 22400,
      monthlyEarnings: 6900,
      followers: "850K",
      engagementRate: 7.5,
      completedDeals: 14,
      rating: 4.8,
      platforms: ["instagram", "youtube"],
      growth: "+9%",
      tier: "silver",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getTierBadge = (tier: string) => {
    const variants = {
      platinum: "bg-purple-100 text-purple-800",
      gold: "bg-yellow-100 text-yellow-800",
      silver: "bg-gray-100 text-gray-800",
    };
    return (
      <Badge className={variants[tier as keyof typeof variants]}>
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const filteredInfluencers = topInfluencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      influencer.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Influencer Leaderboard
          </h1>
          <p className="text-gray-600">
            Top-performing influencers ranked by earnings and engagement
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Influencers
              </CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <p className="text-xs text-green-600 font-medium">
                +12% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$2.4M</div>
              <p className="text-xs text-green-600 font-medium">
                +18% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg. Engagement
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">8.7%</div>
              <p className="text-xs text-green-600 font-medium">
                +2.1% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Campaigns
              </CardTitle>
              <Trophy className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <p className="text-xs text-green-600 font-medium">
                +8% this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search influencers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Top Performers
            </CardTitle>
            <CardDescription>
              Ranked by total earnings and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Deals</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInfluencers.map((influencer) => (
                  <TableRow key={influencer.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {getRankIcon(influencer.rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {influencer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {influencer.handle}
                          </div>
                        </div>
                        {getTierBadge(influencer.tier)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{influencer.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {influencer.followers}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">
                          {influencer.engagementRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {influencer.completedDeals}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{influencer.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-bold text-green-600">
                          ${influencer.monthlyEarnings.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${influencer.totalEarnings.toLocaleString()} total
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-green-600 font-medium">
                        {influencer.growth}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {influencer.platforms.map((platform) => (
                          <div key={platform}>{getPlatformIcon(platform)}</div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Profile
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
