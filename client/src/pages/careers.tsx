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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">B</span>
              </div>
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">BloodSource</span>
            </Link>
            <nav className="hidden lg:flex space-x-4 xl:space-x-8 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-700">About</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Download the app</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Itoka AI</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Help Center</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Cookie Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Accessibility</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Ads info</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Blog</a>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Careers</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Advertising</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Developers</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Settings</a>
            </nav>
            <div className="lg:hidden">
              <Button variant="ghost" size="sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Left Column - Job Openings */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-3 sm:mb-4">
              Careers at BloodSource
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              We are always looking for talented people to join our team. Check back soon for open positions!
            </p>

            <div className="space-y-4 sm:space-y-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="bg-white shadow-md">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                      {job.description}
                    </p>
                    <div className="flex justify-end">
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base"
                        size="sm"
                      >
                        {job.buttonText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Team Member Feature */}
          <div className="lg:pl-8">
            <Card className="bg-white shadow-md">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={teamMember.image}
                      alt={teamMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {teamMember.name}
                  </h3>
                  <Badge variant="secondary" className="mb-3 sm:mb-4 text-red-600 bg-red-50 text-xs sm:text-sm">
                    {teamMember.role}
                  </Badge>
                  <blockquote className="text-gray-600 italic text-xs sm:text-sm leading-relaxed">
                    "{teamMember.quote}"
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">About</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Download the app</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Itoka AI</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Help Center</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Cookie Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Accessibility</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Ads info</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Blog</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700 text-red-600">Careers</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Advertising</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Developers</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-700">Settings</a>
          </div>
          <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
            © 2025 BloodSource Corp.
          </div>
        </div>
      </footer>
    </div>
  );
}