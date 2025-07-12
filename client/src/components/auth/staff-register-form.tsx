import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StaffRegisterFormData {
  verifyCode: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface StaffRegisterFormProps {
  onSuccess?: () => void;
}

export default function StaffRegisterForm({ onSuccess }: StaffRegisterFormProps) {
  const [formData, setFormData] = useState<StaffRegisterFormData>({
    verifyCode: "",
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (!formData.verifyCode || !formData.username || !formData.fullName || !formData.email || !formData.password) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    registerMutation.mutate({
      ...formData,
      isStaff: true,
      verifyCode: formData.verifyCode,
    });
  };

  const handleChange = (field: keyof StaffRegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Verify Code</Label>
          <Input
            placeholder="Enter 4 digit code"
            value={formData.verifyCode}
            onChange={(e) => handleChange("verifyCode", e.target.value)}
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Username</Label>
          <div className="flex">
            <Input
              placeholder="Enter username"
              className="rounded-r-none"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
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
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Email</Label>
          <Input
            type="email"
            placeholder="Please Use Fresh Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Phone</Label>
          <Input
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Password</Label>
          <Input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-700">Verify Password</Label>
        <Input
          type="password"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-blood-red hover:bg-red-700"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
