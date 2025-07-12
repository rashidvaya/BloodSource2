import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Sun, 
  Bell, 
  MessageCircle, 
  Bookmark, 
  Settings, 
  Home, 
  Layers, 
  Mail, 
  FileText, 
  Layers3, 
  Grid3x3, 
  Map, 
  BarChart3, 
  File, 
  Stamp, 
  Shield,
  ChevronRight,
  Eye,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Maximize,
  Smartphone,
  Box
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getAuthToken } from "@/lib/auth";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
  });

  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await fetch("/api/analytics/latest", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    },
  });

  const sidebarItems = [
    {
      section: "MAIN",
      items: [
        { icon: Home, label: "Dashboards", active: true, hasSubmenu: true },
        { icon: Layers, label: "Widgets" },
      ]
    },
    {
      section: "GENERAL",
      items: [
        { icon: Mail, label: "Components", hasSubmenu: true },
        { icon: Box, label: "Elements", hasSubmenu: true },
        { icon: FileText, label: "Forms", hasSubmenu: true },
        { icon: Layers3, label: "Advanced UI", hasSubmenu: true },
        { icon: Grid3x3, label: "Basic UI", hasSubmenu: true },
      ]
    },
    {
      section: "LEVELS",
      items: [
        { icon: FileText, label: "NestedMenu", hasSubmenu: true },
      ]
    },
    {
      section: "MAPS & CHARTS",
      items: [
        { icon: Map, label: "Maps", hasSubmenu: true },
        { icon: BarChart3, label: "Charts", hasSubmenu: true },
      ]
    },
    {
      section: "PAGES",
      items: [
        { icon: File, label: "Pages", hasSubmenu: true },
        { icon: Stamp, label: "Stamp", hasSubmenu: true },
        { icon: Shield, label: "Authentication", hasSubmenu: true },
      ]
    },
  ];

  const meetings = [
    {
      title: "Collab with Tintin",
      time: "1:30pm - 2:30pm",
      participants: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      ]
    },
    {
      title: "Meeting about shipping",
      time: "2:40pm - 4:30pm",
      participants: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      ]
    },
    {
      title: "Greetings for marketing",
      time: "9:45am - 11:30am",
      participants: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="bg-dark-bg border-b border-gray-700 px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Box className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-white text-sm sm:text-lg font-semibold">synto</span>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Smartphone className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2 hidden sm:flex">
              <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
              <span className="text-white text-sm">🇺🇸</span>
            </div>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden lg:flex">
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden lg:flex">
              <Maximize className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 p-0 bg-red-500 text-xs">1</Badge>
            </div>
            <div className="relative hidden sm:flex">
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 p-0 bg-green-500 text-xs">1</Badge>
            </div>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
              <AvatarImage src={currentUser?.profileImage} />
              <AvatarFallback>{currentUser?.fullName?.[0]}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 sm:w-20 lg:w-64 bg-dark-bg border-r border-gray-700 h-screen overflow-y-auto">
          <div className="p-2 sm:p-4">
            <div className="flex items-center space-x-2 mb-4 sm:mb-8">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Box className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-white text-sm sm:text-lg font-semibold hidden lg:block">synto</span>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {sidebarItems.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 hidden lg:block">{section.section}</h3>
                  <div className="space-y-1 sm:space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <Button
                        key={itemIndex}
                        variant="ghost"
                        className={`w-full justify-start px-1 sm:px-2 lg:px-3 py-2 h-auto ${
                          item.active 
                            ? "text-white bg-gray-700" 
                            : "text-gray-400 hover:text-white hover:bg-gray-700"
                        }`}
                      >
                        <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 lg:mr-3" />
                        <span className="flex-1 text-left text-sm hidden lg:block">{item.label}</span>
                        {item.hasSubmenu && <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-auto hidden lg:block" />}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-2 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {/* Left Column - Welcome & Meetings */}
            <div className="lg:col-span-1">
              <Card className="bg-card-bg border-gray-700">
                <CardContent className="p-3 sm:p-4 lg:p-6 text-white">
                  <div className="mb-3 sm:mb-4">
                    <div className="text-xs sm:text-sm text-gray-400">Friday, Jul 11, 2025</div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Good morning, Captain!</h2>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="text-sm text-gray-400">Updates from yesterday.</div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <span className="text-xl font-semibold">
                        {analytics?.visitors?.toLocaleString() || "2,110"}
                      </span>
                      <span className="text-sm text-gray-400">Visitors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                      <span className="text-xl font-semibold">
                        ${analytics?.earnings ? (analytics.earnings / 100).toFixed(1) : "8.2"}M
                      </span>
                      <span className="text-sm text-gray-400">Earnings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5 text-blue-400" />
                      <span className="text-xl font-semibold">
                        {analytics?.orders?.toLocaleString() || "1,124"}
                      </span>
                      <span className="text-sm text-gray-400">Orders</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-4">You have {meetings.length} meetings today.</div>
                  
                  <div className="space-y-3">
                    {meetings.map((meeting, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          {meeting.participants.map((participant, pIndex) => (
                            <Avatar key={pIndex} className="h-6 w-6 border-2 border-gray-700">
                              <AvatarImage src={participant} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div>
                          <div className="font-semibold">{meeting.title}</div>
                          <div className="text-sm text-gray-400">{meeting.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Middle Columns - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Monthly Net Profit */}
              <Card className="bg-card-bg border-gray-700">
                <CardContent className="p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Monthly Net Profit</h3>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">Total profit gained</div>
                  <div className="text-3xl font-bold mb-2">$25,049</div>
                  <div className="flex items-center text-sm text-green-400 mb-4">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +4.33% vs last month
                  </div>
                  {/* Simplified chart representation */}
                  <div className="h-20 flex items-end space-x-1">
                    {[8, 12, 6, 16, 10, 20].map((height, index) => (
                      <div
                        key={index}
                        className="w-8 bg-blue-500 rounded-sm"
                        style={{ height: `${height * 4}px` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Revenue per visitor */}
              <Card className="bg-card-bg border-gray-700">
                <CardContent className="p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Revenue per visitor</h3>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">Average income per visitors in your website</div>
                  <div className="text-3xl font-bold mb-2">$63.02</div>
                  <div className="flex items-center text-sm text-red-400 mb-4">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    -1.03% vs last month
                  </div>
                  {/* Simplified bar chart */}
                  <div className="h-20 flex items-end space-x-1">
                    {[16, 12, 20, 8, 14, 10, 18, 6].map((height, index) => (
                      <div
                        key={index}
                        className="w-4 bg-blue-500 rounded-sm"
                        style={{ height: `${height * 4}px` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Revenue Generated */}
              <Card className="bg-card-bg border-gray-700">
                <CardContent className="p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Revenue Generated</h3>
                    <select className="bg-dark-bg text-white text-sm px-3 py-1 rounded border border-gray-600">
                      <option>Last month</option>
                      <option>This month</option>
                      <option>Last year</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-400 mb-4">Amount of revenue in this month comparing to last year</div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Last year</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">This year</span>
                    </div>
                    <div className="flex items-center text-sm text-green-400">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +6.19%
                    </div>
                  </div>
                  {/* Simplified line chart */}
                  <div className="h-20 flex items-center">
                    <div className="w-full h-px bg-gray-600 relative">
                      <div className="absolute inset-0 flex items-center justify-between">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="w-2 h-2 bg-blue-500 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Boost Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-green-500 to-blue-600 border-0">
                <CardContent className="p-6 text-white">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Boost your USD balance</div>
                    <div className="text-3xl font-bold mb-4">by 2.5%</div>
                    {/* Decorative waves */}
                    <div className="relative overflow-hidden h-32 mt-6">
                      <div className="absolute inset-0 opacity-30">
                        <div className="w-full h-full bg-gradient-to-t from-blue-800 to-green-600 rounded-full transform scale-150"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
