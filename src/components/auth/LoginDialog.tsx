import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Mail, Lock, ArrowRight } from "lucide-react";

interface LoginDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLogin?: () => void;
}

export default function LoginDialog({
  open = false,
  onOpenChange = () => {},
  onLogin = () => {},
}: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - any credentials work
    onLogin();
  };

  const handleSocialLogin = (provider: string) => {
    // Demo social login
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="relative">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">CommiSafe</span>
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            Welcome Back!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Sign up to access your commission dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleSocialLogin("google")}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 h-11"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span>Sign up with Google</span>
            </Button>

            <Button
              onClick={() => handleSocialLogin("facebook")}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 h-11"
            >
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              <span>Sign up with Facebook</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 h-11"
            >
              Sign Up & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              This is a demo. Any credentials will work!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
