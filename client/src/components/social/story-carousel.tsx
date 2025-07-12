import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth";

interface Story {
  id: number;
  authorId: number;
  imageUrl?: string;
  text?: string;
  author?: {
    id: number;
    fullName: string;
    profileImage?: string;
  };
}

export default function StoryCarousel() {
  const { data: stories } = useQuery({
    queryKey: ["stories"],
    queryFn: async (): Promise<Story[]> => {
      const token = getAuthToken();
      const response = await fetch("/api/stories", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) return [];
      return response.json();
    },
  });

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {/* Create Story */}
          <div className="flex-shrink-0 relative cursor-pointer">
            <div className="w-24 h-32 bg-gray-200 rounded-xl overflow-hidden relative hover:bg-gray-300 transition-colors">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 bg-facebook-blue rounded-full flex items-center justify-center mx-auto mb-2">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-600 font-medium">Create story</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Story Items */}
          {stories?.map((story, index) => (
            <div key={story.id} className="flex-shrink-0 relative cursor-pointer">
              <div className="w-24 h-32 rounded-xl overflow-hidden relative">
                {story.imageUrl ? (
                  <img 
                    src={story.imageUrl} 
                    alt="Story" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-orange-400 to-red-500 flex items-center justify-center">
                    <div className="text-white text-xs font-medium text-center px-2">
                      {story.text || `Story ${index + 1}`}
                    </div>
                  </div>
                )}
                
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center border-2 border-white">
                    {story.author?.profileImage ? (
                      <img 
                        src={story.author.profileImage} 
                        alt={story.author.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {story.author?.fullName?.[0] || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                  {story.author?.fullName || "User"}
                </div>
              </div>
            </div>
          ))}
          
          {/* Placeholder stories if none exist */}
          {(!stories || stories.length === 0) && [1, 2, 3, 4].map((index) => (
            <div key={index} className="flex-shrink-0 relative cursor-pointer">
              <div className="w-24 h-32 rounded-xl overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-b from-orange-400 to-red-500 flex items-center justify-center">
                  <div className="text-white text-xs font-medium">Story {index}</div>
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
  );
}
