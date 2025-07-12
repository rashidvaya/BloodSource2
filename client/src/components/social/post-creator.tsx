import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Video, Image as ImageIcon, Smile } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getAuthToken } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function PostCreator() {
  const [postContent, setPostContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
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
      if (!response.ok) return [];
      return response.json();
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/posts", { content });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "Your post has been shared!",
      });
      setPostContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Please write something",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate(postContent);
  };

  return (
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCreatePost();
              }
            }}
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
          <Button 
            className="bg-facebook-blue hover:bg-blue-600"
            onClick={handleCreatePost}
            disabled={createPostMutation.isPending}
          >
            <Video className="h-4 w-4 mr-2" />
            {createPostMutation.isPending ? "Posting..." : "Create room"}
          </Button>
        </div>
        
        {friends && friends.length > 0 && (
          <div className="flex space-x-2 mt-3">
            {friends.slice(0, 3).map((friend: any, index: number) => (
              <Avatar key={index} className="h-8 w-8">
                <AvatarImage src={friend.profileImage} />
                <AvatarFallback>{friend.fullName?.[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
