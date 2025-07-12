import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormData {
  invitationCode: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    invitationCode: "",
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "Welcome to BloodSource!",
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
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
    if (!formData.invitationCode || !formData.fullName || !formData.username || !formData.email) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    registerMutation.mutate({
      ...formData,
      password: "tempPassword123", // This would be handled in step 2
      invitationCode: formData.invitationCode,
    });
  };

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Invitation code"
          className="flex-1"
          value={formData.invitationCode}
          onChange={(e) => handleChange("invitationCode", e.target.value)}
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
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
      </div>
      
      <Input
        placeholder="Username"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="email"
          placeholder="Email address"
          className="pl-10"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
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
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
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
  );
}
