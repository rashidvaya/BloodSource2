import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, ThumbsUp, MessageCircle, Share } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  author?: {
    id: number;
    fullName: string;
    profileImage?: string;
  };
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/likes", { postId: post.id });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to like post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const handleLike = () => {
    likeMutation.mutate();
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author?.profileImage} />
                <AvatarFallback>{post.author?.fullName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{post.author?.fullName || "User"}</div>
                <div className="text-gray-500 text-sm">{formatDate(post.createdAt)}</div>
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
            <img 
              src={post.imageUrl} 
              alt="Post content" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {post.likesCount > 0 && (
                <span>{post.likesCount} likes</span>
              )}
              {post.commentsCount > 0 && (
                <span>{post.commentsCount} comments</span>
              )}
              {post.sharesCount > 0 && (
                <span>{post.sharesCount} shares</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-facebook-blue"
                onClick={handleLike}
                disabled={likeMutation.isPending}
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-facebook-blue">
                <MessageCircle className="h-5 w-5 mr-2" />
                Comment
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-facebook-blue">
                <Share className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
