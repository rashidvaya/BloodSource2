import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, Mail, Phone, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, register } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  invitationCode: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
}

interface StaffRegisterFormData {
  verifyCode: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function Landing() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showStaffRegisterModal, setShowStaffRegisterModal] = useState(false);
  const [showStaffSuccessModal, setShowStaffSuccessModal] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    invitationCode: "",
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });
  const [staffRegisterForm, setStaffRegisterForm] = useState<StaffRegisterFormData>({
    verifyCode: "",
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: "Welcome to BloodSource!",
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setShowRegisterModal(false);
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information",
        variant: "destructive",
      });
    },
  });

  const staffRegisterMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setShowStaffRegisterModal(false);
      setShowStaffSuccessModal(true);
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.invitationCode || !registerForm.fullName || !registerForm.username || !registerForm.email) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    registerMutation.mutate({
      ...registerForm,
      password: "tempPassword123", // This should be handled in a second step
      invitationCode: registerForm.invitationCode,
    });
  };

  const handleStaffRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffRegisterForm.password !== staffRegisterForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    staffRegisterMutation.mutate({
      ...staffRegisterForm,
      password: staffRegisterForm.password,
      isStaff: true,
      verifyCode: staffRegisterForm.verifyCode,
    });
  };

  const handleStaffSuccessLogin = () => {
    setShowStaffSuccessModal(false);
    // Redirect to dashboard or trigger login
    queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex items-center justify-center px-4 py-4 sm:py-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Side - Brand Information */}
            <div className="text-center lg:text-left order-1 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blood-red mb-4">BloodSource</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
                BloodSource helps you connect and share with the people in your life.
              </p>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-2">
              <Card className="w-full max-w-md shadow-xl">
                <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Hi, Welcome Back 👋</h2>
                  <p className="text-sm sm:text-base text-gray-600">It's great to see you again.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-10 pr-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-blood-red hover:bg-red-700"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Log in"}
                  </Button>
                </form>
                
                <div className="text-center mt-4">
                  <button className="text-blood-red hover:underline">
                    Forgotten password?
                  </button>
                </div>
                
                <div className="text-center text-gray-500 my-6">or</div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full bg-facebook-blue text-white hover:bg-blue-600">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </Button>
                  
                  <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.74.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                    Continue with Apple
                  </Button>
                </div>
                
                <div className="text-center mt-6">
                  <Button
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full bg-success-green hover:bg-green-700"
                  >
                    Create new account
                  </Button>
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
            <Link href="/careers" className="hover:text-gray-700">Careers</Link>
            <a href="#" className="hover:text-gray-700">Advertising</a>
            <a href="#" className="hover:text-gray-700">Developers</a>
            <a href="#" className="hover:text-gray-700">Settings</a>
            <span>© 2025 RedByte Corp.</span>
          </div>
        </div>
      </div>

      {/* Member Registration Modal */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-blood-red text-lg sm:text-xl">New member registration 🎉</DialogTitle>
            <p className="text-center text-gray-600 text-sm sm:text-base">You are on step 1 out of 2.</p>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Invitation code"
                className="flex-1"
                value={registerForm.invitationCode}
                onChange={(e) => setRegisterForm({ ...registerForm, invitationCode: e.target.value })}
              />
              <Button type="button" className="bg-facebook-blue hover:bg-blue-600">
                Verify
              </Button>
            </div>
            
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Full name"
                className="pl-10"
                value={registerForm.fullName}
                onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
              />
            </div>
            
            <Input
              placeholder="Username"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
            />
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Email address"
                className="pl-10"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
            </div>
            
            <div className="flex space-x-2">
              <Select defaultValue="+880">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+880">🇧🇩 +880</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="XXXXXXXXX"
                className="flex-1"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-success-green hover:bg-green-700"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account..." : "Next"}
            </Button>
          </form>
          
          <div className="text-center text-gray-500 my-6">or</div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full bg-facebook-blue text-white hover:bg-blue-600">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign up with Facebook
            </Button>
            
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </Button>
            
            <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.74.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              Sign up with Apple
            </Button>
          </div>
          
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setShowRegisterModal(false);
                setShowStaffRegisterModal(true);
              }}
              className="text-blood-red hover:underline"
            >
              Already have an account? Log in
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Staff Registration Modal */}
      <Dialog open={showStaffRegisterModal} onOpenChange={setShowStaffRegisterModal}>
        <DialogContent className="max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-blood-red text-lg sm:text-xl">New Staff Registration</DialogTitle>
            <p className="text-center text-gray-600 text-sm sm:text-base">Fill out the form below to register as a staff member.</p>
          </DialogHeader>
          
          <form onSubmit={handleStaffRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Verify Code</Label>
                <Input
                  placeholder="Enter 4 digit code"
                  value={staffRegisterForm.verifyCode}
                  onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, verifyCode: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Username</Label>
                <div className="flex">
                  <Input
                    placeholder="Enter username"
                    className="rounded-r-none"
                    value={staffRegisterForm.username}
                    onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, username: e.target.value })}
                  />
                  <Select defaultValue=".ad">
                    <SelectTrigger className="w-16 rounded-l-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=".ad">.ad</SelectItem>
                      <SelectItem value=".com">.com</SelectItem>
                      <SelectItem value=".org">.org</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input
                  placeholder="Enter your full name"
                  value={staffRegisterForm.fullName}
                  onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, fullName: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  type="email"
                  placeholder="Please Use Fresh Email"
                  value={staffRegisterForm.email}
                  onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                <Input
                  placeholder="Enter your phone number"
                  value={staffRegisterForm.phone}
                  onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, phone: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={staffRegisterForm.password}
                  onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, password: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">Verify Password</Label>
              <Input
                type="password"
                placeholder="Re-enter password"
                value={staffRegisterForm.confirmPassword}
                onChange={(e) => setStaffRegisterForm({ ...staffRegisterForm, confirmPassword: e.target.value })}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-blood-red hover:bg-red-700"
              disabled={staffRegisterMutation.isPending}
            >
              {staffRegisterMutation.isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Staff Success Modal */}
      <Dialog open={showStaffSuccessModal} onOpenChange={setShowStaffSuccessModal}>
        <DialogContent className="max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-blood-red text-lg sm:text-xl">New Staff Registration</DialogTitle>
          </DialogHeader>
          
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-blood-red mb-2">Welcome to BloodSource!</h3>
              <p className="text-gray-700 mb-4">Thank you for registering and becoming a part of the BloodSource team.</p>
              <p className="text-gray-600 mb-2">We're excited to have you on board!</p>
              <p className="text-gray-600 mb-6">You can now log in to your account and start exploring your dashboard.</p>
              
              <Button
                onClick={handleStaffSuccessLogin}
                className="bg-blood-red hover:bg-red-700"
              >
                Log In to Your Account
              </Button>
              
              <p className="text-gray-600 mt-4">If you need any help, feel free to reach out — we're here for you.</p>
              
              <div className="mt-4 text-blood-red font-semibold">
                Let's make a difference together. ❤️ 🩸
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
