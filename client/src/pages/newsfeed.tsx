import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Home, 
  Users, 
  Play, 
  Store, 
  UserPlus, 
  Clock, 
  Bookmark, 
  Flag, 
  Calendar,
  Shield,
  Video,
  Image as ImageIcon,
  Smile,
  Plus,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  ThumbsUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth";
import { getAuthToken } from "@/lib/auth";

export default function Newsfeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [postContent, setPostContent] = useState("");

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await fetch("/api/posts", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    },
  });

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await fetch("/api/friends", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    },
  });

  const { data: friendRequests } = useQuery({
    queryKey: ["friend-requests"],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await fetch("/api/friend-requests", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    },
  });

  const { data: stories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await fetch("/api/stories", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    },
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-facebook-blue rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search BloodSource"
                  className="w-64 pl-10 bg-gray-100 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Home className="h-6 w-6 text-facebook-blue" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Users className="h-6 w-6 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Play className="h-6 w-6 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Store className="h-6 w-6 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Users className="h-6 w-6 text-gray-600" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.profileImage} />
                <AvatarFallback>{currentUser?.fullName?.[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{currentUser?.fullName}</span>
              <Button variant="ghost" size="sm" className="p-2">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
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
                      className="w-full justify-start px-3 py-2 h-auto"
                    >
                      <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                      <span>{item.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stories Section */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  <div className="flex-shrink-0 relative">
                    <div className="w-24 h-32 bg-gradient-to-b from-transparent to-black rounded-xl overflow-hidden relative cursor-pointer">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-facebook-blue rounded-full flex items-center justify-center mx-auto mb-2">
                            <Plus className="h-4 w-4 text-white" />
                          </div>
                          <div className="text-xs text-gray-600 font-medium">Create story</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {stories?.map((story: any, index: number) => (
                    <div key={index} className="flex-shrink-0 relative">
                      <div className="w-24 h-32 rounded-xl overflow-hidden relative cursor-pointer">
                        <div className="w-full h-full bg-gradient-to-b from-orange-400 to-red-500 flex items-center justify-center">
                          <div className="text-white text-xs font-medium">Story {index + 1}</div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                          Max taxis
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Create Post */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.profileImage} />
                    <AvatarFallback>{currentUser?.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="What's in your mind?"
                    className="flex-1 bg-gray-100 rounded-full"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <Video className="h-5 w-5 mr-2 text-red-500" />
                      Live video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ImageIcon className="h-5 w-5 mr-2 text-green-500" />
                      Photo/Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <Smile className="h-5 w-5 mr-2 text-yellow-500" />
                      Feeling/activity
                    </Button>
                  </div>
                  <Button className="bg-facebook-blue hover:bg-blue-600">
                    <Video className="h-4 w-4 mr-2" />
                    Create room
                  </Button>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  {friends?.slice(0, 3).map((friend: any, index: number) => (
                    <Avatar key={index} className="h-8 w-8">
                      <AvatarImage src={friend.profileImage} />
                      <AvatarFallback>{friend.fullName?.[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Posts */}
            {posts?.map((post: any, index: number) => (
              <Card key={index} className="mb-4">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author?.profileImage} />
                          <AvatarFallback>{post.author?.fullName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author?.fullName || "User"}</div>
                          <div className="text-gray-500 text-sm">2 hours ago</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-800 mb-3">{post.content}</p>
                  </div>
                  
                  {post.imageUrl && (
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-400">Image placeholder</div>
                    </div>
                  )}
                  
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <ThumbsUp className="h-5 w-5 mr-2" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share className="h-5 w-5 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Friend Requests */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Friend requests</h3>
                  <Button variant="ghost" size="sm" className="text-facebook-blue">
                    See all
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {friendRequests?.map((request: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.sender?.profileImage} />
                        <AvatarFallback>{request.sender?.fullName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{request.sender?.fullName}</div>
                        <div className="text-gray-500 text-sm">4d</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-facebook-blue hover:bg-blue-600">
                          Confirm
                        </Button>
                        <Button size="sm" variant="secondary">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Contacts */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Contacts</h3>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {friends?.map((friend: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={friend.profileImage} />
                          <AvatarFallback>{friend.fullName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-sm">{friend.fullName}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
