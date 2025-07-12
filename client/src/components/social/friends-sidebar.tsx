import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreHorizontal } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FriendRequest {
  id: number;
  senderId: number;
  receiverId: number;
  status: string;
  createdAt: string;
  sender?: {
    id: number;
    fullName: string;
    profileImage?: string;
  };
}

interface Friend {
  id: number;
  fullName: string;
  profileImage?: string;
}

export default function FriendsSidebar() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: friendRequests } = useQuery({
    queryKey: ["friend-requests"],
    queryFn: async (): Promise<FriendRequest[]> => {
      const token = getAuthToken();
      const response = await fetch("/api/friend-requests", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async (): Promise<Friend[]> => {
      const token = getAuthToken();
      const response = await fetch("/api/friends", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const acceptRequestMutation = useMutation({
    mutationFn: async (requestId: number) => {
      const response = await apiRequest("POST", `/api/friend-requests/${requestId}/accept`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Friend request accepted",
        description: "You are now friends!",
      });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to accept request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: async (requestId: number) => {
      const response = await apiRequest("POST", `/api/friend-requests/${requestId}/reject`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Friend request rejected",
      });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to reject request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays}d`;
  };

  return (
    <div className="space-y-4">
      {/* Friend Requests */}
      {friendRequests && friendRequests.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Friend requests</h3>
              <Button variant="ghost" size="sm" className="text-facebook-blue">
                See all
              </Button>
            </div>
            
            <div className="space-y-3">
              {friendRequests.map((request) => (
                <div key={request.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.sender?.profileImage} />
                    <AvatarFallback>{request.sender?.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{request.sender?.fullName}</div>
                    <div className="text-gray-500 text-sm">{formatDate(request.createdAt)}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-facebook-blue hover:bg-blue-600"
                      onClick={() => acceptRequestMutation.mutate(request.id)}
                      disabled={acceptRequestMutation.isPending}
                    >
                      Confirm
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => rejectRequestMutation.mutate(request.id)}
                      disabled={rejectRequestMutation.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
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
            {friends?.map((friend) => (
              <div key={friend.id} className="flex items-center space-x-3">
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
            
            {/* Placeholder contacts if none exist */}
            {(!friends || friends.length === 0) && [1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U{index}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm">User {index}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
