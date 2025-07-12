import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Accessibility,
  Sliders
} from "lucide-react";
import { logout } from "@/lib/auth";

interface ProfileDropdownProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ user, isOpen, onClose }: ProfileDropdownProps) {
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-80 z-50">
        <Card className="bg-gray-900 border-gray-700 shadow-2xl">
          <CardContent className="p-0">
            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {user?.fullName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-semibold text-lg">
                    {user?.fullName || "Guest"}
                  </div>
                  <Badge className="bg-orange-600 text-white text-xs">
                    Merchant Captain 💎
                  </Badge>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Accessibility className="h-5 w-5 mr-3" />
                Accessibility
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Sliders className="h-5 w-5 mr-3" />
                Preferences
              </Button>
              
              <div className="flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 mr-3" />
                  Dark mode
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Settings className="h-5 w-5 mr-3" />
                Account Settings
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <HelpCircle className="h-5 w-5 mr-3" />
                Help Center
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}