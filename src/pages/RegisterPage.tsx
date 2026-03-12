import { useState } from "react";
import { MapPin, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface RegisterPageProps {
  onRegister: (email: string, password: string, name: string) => boolean;
  onGoLogin: () => void;
}

const RegisterPage = ({ onRegister, onGoLogin }: RegisterPageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    onRegister(email, password, name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Start tracking your location</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Create Account</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <button onClick={onGoLogin} className="text-primary font-medium hover:underline">Sign in</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
