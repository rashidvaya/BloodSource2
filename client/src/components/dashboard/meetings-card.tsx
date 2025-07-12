import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, DollarSign, ShoppingCart } from "lucide-react";

interface Meeting {
  title: string;
  time: string;
  participants: string[];
}

interface MeetingsCardProps {
  analytics?: {
    visitors: number;
    earnings: number;
    orders: number;
  };
  meetings?: Meeting[];
}

export default function MeetingsCard({ analytics, meetings }: MeetingsCardProps) {
  const defaultMeetings: Meeting[] = [
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

  const meetingData = meetings || defaultMeetings;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <Card className="bg-card-bg border-gray-700">
      <CardContent className="p-6 text-white">
        <div className="mb-4">
          <div className="text-sm text-gray-400">{currentDate}</div>
          <h2 className="text-2xl font-bold">Good morning, Captain!</h2>
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
              ${analytics?.earnings ? (analytics.earnings / 100000).toFixed(1) : "8.2"}M
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
        
        <div className="text-sm text-gray-400 mb-4">You have {meetingData.length} meetings today.</div>
        
        <div className="space-y-3">
          {meetingData.map((meeting, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {meeting.participants.map((participant, pIndex) => (
                  <Avatar key={pIndex} className="h-6 w-6 border-2 border-gray-700">
                    <AvatarImage src={participant} />
                    <AvatarFallback>U{pIndex + 1}</AvatarFallback>
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
  );
}
