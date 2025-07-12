import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  description: string;
  value: string;
  trend: {
    direction: "up" | "down";
    percentage: string;
    period: string;
  };
  chart?: "bar" | "line";
  chartData?: number[];
}

export default function AnalyticsCard({ 
  title, 
  description, 
  value, 
  trend, 
  chart = "bar",
  chartData = [16, 12, 20, 8, 14, 10, 18, 6]
}: AnalyticsCardProps) {
  const TrendIcon = trend.direction === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend.direction === "up" ? "text-green-400" : "text-red-400";

  return (
    <Card className="bg-card-bg border-gray-700">
      <CardContent className="p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
        <div className="text-sm text-gray-400 mb-2">{description}</div>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className={`flex items-center text-sm ${trendColor} mb-4`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          {trend.percentage} vs {trend.period}
        </div>
        
        {/* Chart visualization */}
        <div className="h-20 flex items-end space-x-1">
          {chart === "bar" ? (
            chartData.map((height, index) => (
              <div
                key={index}
                className="w-4 bg-blue-500 rounded-sm"
                style={{ height: `${height * 4}px` }}
              />
            ))
          ) : (
            <div className="w-full h-px bg-gray-600 relative">
              <div className="absolute inset-0 flex items-center justify-between">
                {chartData.map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-blue-500 rounded-full" />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
