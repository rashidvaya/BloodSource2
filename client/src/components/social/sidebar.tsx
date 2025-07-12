import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserPlus, 
  Users, 
  Store, 
  Clock, 
  Play, 
  Bookmark, 
  Flag, 
  Calendar,
  Shield
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth";

export default function Sidebar() {
  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
  });

  const sidebarItems = [
    { icon: UserPlus, label: "Find Friends", color: "text-blue-500" },
    { icon: Users, label: "Groups", color: "text-blue-500" },
    { icon: Store, label: "Marketplace", color: "text-orange-500" },
    { icon: Clock, label: "Memories", color: "text-blue-500" },
    { icon: Play, label: "Watch", color: "text-blue-500" },
    { icon: Bookmark, label: "Saved", color: "text-purple-500" },
    { icon: Flag, label: "Pages", color: "text-orange-500" },
    { icon: Calendar, label: "Events", color: "text-red-500" },
    { icon: Shield, label: "Most Recent", color: "text-blue-500" },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.profileImage} />
            <AvatarFallback>{currentUser?.fullName?.[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{currentUser?.fullName}</span>
        </div>
        
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start px-3 py-2 h-auto hover:bg-gray-100"
            >
              <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
