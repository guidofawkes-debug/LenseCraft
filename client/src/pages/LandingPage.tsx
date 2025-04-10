
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle auth here - for now just redirect
    navigate('/products');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
      <Card className="w-full max-w-md p-8 bg-black/50 backdrop-blur-lg border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          {isSignup && (
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          )}
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <Button type="submit" className="w-full">
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-primary hover:underline"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </Card>
    </div>
  );
}
