import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Careers() {
  const jobOpenings = [
    {
      title: "Admin",
      description: "Responsible for managing platform operations, user accounts, and ensuring smooth workflow.",
      buttonText: "View More"
    },
    {
      title: "Moderator", 
      description: "Monitor user activity, enforce community guidelines, and help maintain a safe environment.",
      buttonText: "View More"
    }
  ];

  const teamMember = {
    name: "Imran Hossain",
    role: "Community Manager",
    quote: "Our team is dedicated to saving lives, one connection at a time",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header/Navigation */}
      <div className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center text-xs sm:text-sm text-gray-500 space-x-2 sm:space-x-4">
            <a href="#" className="hover:text-gray-700">About</a>
            <a href="#" className="hover:text-gray-700">Download the app</a>
            <a href="#" className="hover:text-gray-700">Boka AI</a>
            <a href="#" className="hover:text-gray-700">Help Center</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Cookie Policy</a>
            <a href="#" className="hover:text-gray-700">Accessibility</a>
            <a href="#" className="hover:text-gray-700">Ads Info</a>
            <a href="#" className="hover:text-gray-700">Blog</a>
            <Link href="/careers" className="hover:text-gray-700 text-red-600">Careers</Link>
            <a href="#" className="hover:text-gray-700">Advertising</a>
            <a href="#" className="hover:text-gray-700">Developers</a>
            <a href="#" className="hover:text-gray-700">Settings</a>
            <span>© 2025 RedByte Corp.</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 sm:py-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Side - Job Openings */}
            <div className="order-1 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blood-red mb-4">
                Careers at BloodSource
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-md">
                We are always looking for talented people to join our team. Check back soon for open positions!
              </p>

              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <Card key={index} className="bg-white shadow-xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex justify-end">
                        <Button className="bg-blood-red hover:bg-red-700 text-white">
                          {job.buttonText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Side - Team Member Feature */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-2">
              <Card className="w-full max-w-md shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={teamMember.image}
                        alt={teamMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {teamMember.name}
                    </h3>
                    <Badge variant="secondary" className="mb-4 text-blood-red bg-red-50">
                      {teamMember.role}
                    </Badge>
                    <blockquote className="text-gray-600 italic leading-relaxed">
                      "{teamMember.quote}"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto w-full bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center text-xs sm:text-sm text-gray-500 space-x-2 sm:space-x-4">
            <a href="#" className="hover:text-gray-700">About</a>
            <a href="#" className="hover:text-gray-700">Download the app</a>
            <a href="#" className="hover:text-gray-700">Boka AI</a>
            <a href="#" className="hover:text-gray-700">Help Center</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Cookie Policy</a>
            <a href="#" className="hover:text-gray-700">Accessibility</a>
            <a href="#" className="hover:text-gray-700">Ads Info</a>
            <a href="#" className="hover:text-gray-700">Blog</a>
            <Link href="/careers" className="hover:text-gray-700 text-red-600">Careers</Link>
            <a href="#" className="hover:text-gray-700">Advertising</a>
            <a href="#" className="hover:text-gray-700">Developers</a>
            <a href="#" className="hover:text-gray-700">Settings</a>
            <span>© 2025 RedByte Corp.</span>
          </div>
        </div>
      </div>
    </div>
  );
}