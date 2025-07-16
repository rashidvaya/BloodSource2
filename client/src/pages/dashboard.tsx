import React, { useState } from "react";
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
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Responsive margin for main content
  const mainMargin = mobileOpen ? "ml-0" : collapsed ? "ml-[90px]" : "ml-[300px]";

  return (
    <>
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className={`${mainMargin} flex flex-col min-h-screen bg-dark-bg transition-all duration-200`}>
        <AdminHeader />
        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Welcome & Meetings */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Greeting and Stats Card */}
              <div className="rounded-2xl bg-[#111317] p-6 text-white shadow border border-[#23262b]">
                <div className="text-sm text-gray-400 mb-1">Wednesday, Jul 16, 2025</div>
                <h2 className="text-2xl font-bold mb-6">Good morning, Captain!</h2>
                <div className="text-gray-400 text-sm mb-4">Updates from yesterday.</div>
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-blue-400" />
                    <span className="text-2xl font-semibold">{analytics?.visitors?.toLocaleString() || "2,110"}</span>
                    <span className="text-base text-gray-400 font-medium">Visitors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-blue-400" />
                    <span className="text-2xl font-semibold">${analytics?.earnings ? (analytics.earnings / 100).toFixed(1) : "8.2"}M</span>
                    <span className="text-base text-gray-400 font-medium">Earnings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-6 w-6 text-blue-400" />
                    <span className="text-2xl font-semibold">{analytics?.orders?.toLocaleString() || "1,124"}</span>
                    <span className="text-base text-gray-400 font-medium">Orders</span>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-2">You have {meetings.length} meetings today.</div>
              </div>
              {/* Meetings Cards */}
              <div className="flex flex-col gap-4">
                {meetings.map((meeting, index) => (
                  <div key={index} className="rounded-2xl bg-[#181A20] p-4 flex items-center gap-4 shadow border border-[#23262b]">
                    <div className="flex -space-x-2">
                      {meeting.participants.map((participant, pIndex) => (
                        <Avatar key={pIndex} className="h-8 w-8 border-2 border-gray-700">
                          <AvatarImage src={participant} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-base">{meeting.title}</div>
                      <div className="text-sm text-gray-400">{meeting.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Center Columns - Stats and Charts */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Monthly Net Profit */}
              <div className="rounded-2xl bg-[#181A20] p-6 shadow border border-[#23262b]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Monthly Net Profit</h3>
                </div>
                <div className="text-sm text-gray-400 mb-1">Total profit gained</div>
                <div className="text-4xl font-bold text-white mb-1">$25,049</div>
                <div className="flex items-center text-sm text-green-400 mb-4">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +4.33% vs last month
                </div>
                {/* Chart placeholder */}
                <div className="h-20 flex items-end space-x-1">
                  {[8, 12, 6, 16, 10, 20].map((height, index) => (
                    <div
                      key={index}
                      className="w-8 bg-blue-500 rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              {/* Revenue per visitor */}
              <div className="rounded-2xl bg-[#181A20] p-6 shadow border border-[#23262b]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Revenue per visitor</h3>
                </div>
                <div className="text-sm text-gray-400 mb-1">Average income per visitors in your website</div>
                <div className="text-4xl font-bold text-white mb-1">$63.02</div>
                <div className="flex items-center text-sm text-orange-400 mb-4">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -1.03% vs last month
                </div>
                {/* Chart placeholder */}
                <div className="h-20 flex items-end space-x-1">
                  {[16, 12, 20, 8, 14, 10, 18, 6].map((height, index) => (
                    <div
                      key={index}
                      className="w-4 bg-blue-500 rounded-sm"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              {/* Revenue Generated */}
              <div className="rounded-2xl bg-[#181A20] p-6 shadow border border-[#23262b]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Revenue Generated</h3>
                  <select className="bg-[#111317] text-white text-sm px-3 py-1 rounded border border-gray-600">
                    <option>Last month</option>
                    <option>This month</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div className="text-sm text-gray-400 mb-2">Amount of revenue in this month comparing to last year</div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Last year</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">This year</span>
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +6.19%
                  </div>
                </div>
                {/* Chart placeholder */}
                <div className="h-20 flex items-center">
                  <div className="w-full h-px bg-gray-600 relative">
                    <div className="absolute inset-0 flex items-center justify-between">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="w-2 h-2 bg-blue-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Boost Card */}
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div className="rounded-2xl bg-gradient-to-br from-[#1e3c72] to-[#2a5298] p-8 h-full flex flex-col items-center justify-center shadow border-0">
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2 text-green-200">Boost your USD balance</div>
                  <div className="text-5xl font-bold mb-4 text-green-100">by 2.5%</div>
                  {/* Decorative waves or background can be added here if needed */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
