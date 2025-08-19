import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Smartphone,
  Dumbbell,
  Gamepad2,
  Shirt,
  Coffee,
  Car,
  Home,
  Headphones,
  Camera,
  Book,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Star,
  Eye,
} from "lucide-react";
import { useState } from "react";

export default function NewContractDeals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");

  const contractDeals = [
    {
      id: 1,
      title: "Fitness App Launch Campaign",
      company: "FitTrack Pro",
      category: "Fitness",
      icon: Dumbbell,
      budget: "$5,000 - $15,000",
      budgetRange: [5000, 15000],
      duration: "3 months",
      followers: "100K+",
      description:
        "Promote our new AI-powered fitness tracking app with workout videos and progress tracking features.",
      requirements: [
        "Fitness/Health niche",
        "Video content",
        "Story posts",
        "App reviews",
      ],
      deliverables: "10 posts, 5 stories, 2 reels, 1 app review",
      deadline: "2024-02-15",
      location: "Remote",
      applicants: 23,
      rating: 4.8,
      isUrgent: false,
      isFeatured: true,
    },
    {
      id: 2,
      title: "Gaming Headset Product Review",
      company: "AudioGear",
      category: "Technology",
      icon: Headphones,
      budget: "$2,000 - $8,000",
      budgetRange: [2000, 8000],
      duration: "1 month",
      followers: "50K+",
      description:
        "Review our latest gaming headset with noise cancellation and RGB lighting features.",
      requirements: [
        "Gaming/Tech niche",
        "Unboxing videos",
        "Gameplay footage",
        "Honest reviews",
      ],
      deliverables: "1 unboxing video, 3 gameplay videos, 5 posts",
      deadline: "2024-01-30",
      location: "US/Canada",
      applicants: 45,
      rating: 4.6,
      isUrgent: true,
      isFeatured: false,
    },
    {
      id: 3,
      title: "Sustainable Fashion Collection",
      company: "EcoWear",
      category: "Fashion",
      icon: Shirt,
      budget: "$3,000 - $12,000",
      budgetRange: [3000, 12000],
      duration: "2 months",
      followers: "75K+",
      description:
        "Showcase our new sustainable fashion line made from recycled materials.",
      requirements: [
        "Fashion/Lifestyle niche",
        "Outfit posts",
        "Sustainability focus",
        "Brand values alignment",
      ],
      deliverables: "8 outfit posts, 10 stories, 2 reels, 1 blog post",
      deadline: "2024-02-28",
      location: "Global",
      applicants: 67,
      rating: 4.9,
      isUrgent: false,
      isFeatured: true,
    },
    {
      id: 4,
      title: "Coffee Subscription Service",
      company: "BrewMaster",
      category: "Food & Beverage",
      icon: Coffee,
      budget: "$1,500 - $6,000",
      budgetRange: [1500, 6000],
      duration: "6 weeks",
      followers: "25K+",
      description:
        "Promote our premium coffee subscription service with monthly curated selections.",
      requirements: [
        "Food/Lifestyle niche",
        "Morning routine content",
        "Taste reviews",
        "Subscription benefits",
      ],
      deliverables: "6 posts, 8 stories, 1 reel, 1 taste test video",
      deadline: "2024-02-10",
      location: "Remote",
      applicants: 34,
      rating: 4.7,
      isUrgent: false,
      isFeatured: false,
    },
    {
      id: 5,
      title: "Mobile Game Launch",
      company: "GameStudio",
      category: "Gaming",
      icon: Gamepad2,
      budget: "$4,000 - $20,000",
      budgetRange: [4000, 20000],
      duration: "4 months",
      followers: "200K+",
      description:
        "Launch campaign for our new mobile RPG game with exclusive early access.",
      requirements: [
        "Gaming niche",
        "Gameplay videos",
        "Live streaming",
        "Community engagement",
      ],
      deliverables: "15 posts, 20 stories, 5 gameplay videos, 2 live streams",
      deadline: "2024-03-15",
      location: "Global",
      applicants: 89,
      rating: 4.5,
      isUrgent: true,
      isFeatured: true,
    },
    {
      id: 6,
      title: "Smart Home Devices",
      company: "TechHome",
      category: "Technology",
      icon: Home,
      budget: "$2,500 - $10,000",
      budgetRange: [2500, 10000],
      duration: "2 months",
      followers: "80K+",
      description:
        "Showcase our smart home ecosystem including lights, security, and automation.",
      requirements: [
        "Tech/Lifestyle niche",
        "Home setup videos",
        "Product demos",
        "Installation guides",
      ],
      deliverables: "8 posts, 12 stories, 3 demo videos, 1 setup guide",
      deadline: "2024-02-20",
      location: "US/EU",
      applicants: 52,
      rating: 4.8,
      isUrgent: false,
      isFeatured: false,
    },
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      Fitness: Dumbbell,
      Technology: Smartphone,
      Gaming: Gamepad2,
      Fashion: Shirt,
      "Food & Beverage": Coffee,
      Automotive: Car,
      "Home & Garden": Home,
    };
    return icons[category as keyof typeof icons] || Smartphone;
  };

  const getBudgetColor = (budgetRange: number[]) => {
    const maxBudget = budgetRange[1];
    if (maxBudget >= 15000) return "text-green-600 bg-green-50";
    if (maxBudget >= 8000) return "text-blue-600 bg-blue-50";
    return "text-orange-600 bg-orange-50";
  };

  const filteredDeals = contractDeals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      deal.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesBudget =
      budgetFilter === "all" ||
      (budgetFilter === "low" && deal.budgetRange[1] < 5000) ||
      (budgetFilter === "medium" &&
        deal.budgetRange[1] >= 5000 &&
        deal.budgetRange[1] < 15000) ||
      (budgetFilter === "high" && deal.budgetRange[1] >= 15000);

    return matchesSearch && matchesCategory && matchesBudget;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            New Contract Deals
          </h1>
          <p className="text-gray-600">
            Discover exciting partnership opportunities with top brands
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Deals
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">247</div>
              <p className="text-xs text-green-600 font-medium">
                +15% this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Budget
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$1.2M</div>
              <p className="text-xs text-green-600 font-medium">
                Available this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg. Duration
              </CardTitle>
              <Clock className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2.3</div>
              <p className="text-xs text-gray-500">months per campaign</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Applications
              </CardTitle>
              <Users className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,847</div>
              <p className="text-xs text-green-600 font-medium">
                +23% this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Find Your Perfect Deal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search deals, companies, or keywords..."
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
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="food & beverage">
                    Food & Beverage
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Under $5K</SelectItem>
                  <SelectItem value="medium">$5K - $15K</SelectItem>
                  <SelectItem value="high">$15K+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Post New Deal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contract Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDeals.map((deal) => {
            const IconComponent = deal.icon;
            return (
              <Card
                key={deal.id}
                className="bg-white hover:shadow-lg transition-shadow relative"
              >
                {deal.isFeatured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                {deal.isUrgent && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">
                      <Clock className="h-3 w-3 mr-1" />
                      Urgent
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">
                        {deal.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          {deal.company}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-500">
                            {deal.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{deal.category}</Badge>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(deal.budgetRange)}`}
                        >
                          {deal.budget}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-700">
                    {deal.description}
                  </CardDescription>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{deal.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{deal.followers} followers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Due {deal.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{deal.location}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Requirements:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {deal.requirements.map((req, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Deliverables:
                    </h4>
                    <p className="text-sm text-gray-600">{deal.deliverables}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>{deal.applicants} applicants</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
