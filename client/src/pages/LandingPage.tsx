import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function LandingPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        navigate('/home');  // Change the navigation path to home
      }
    } catch (error) {
      console.error('Google Sign-in error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (userCredential.user) {
          navigate('/home');  // Change the navigation path to home
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (userCredential.user) {
          navigate('/home');  // Change the navigation path to home
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 p-8 rounded-lg backdrop-blur">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>

        <Button 
          onClick={handleGoogleSignIn}
          className="w-full mb-6 bg-white text-black hover:bg-gray-100"
        >
          Continue with Google
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-white/60">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          {isSignup ? 'Already have an account?' : "Don't have an account?"} 
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-white hover:underline"
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </Card>
    </div>
  );
}

/*
the onAuthStateChanged method from Firebase to monitor authentication state changes. This should be placed in a useEffect hook so that we can handle redirection once the user is authenticated

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function LandingPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home'); // Redirect to home page if user is authenticated
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        // User is authenticated, they will be redirected by onAuthStateChanged
      }
    } catch (error) {
      console.error('Google Sign-in error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        // User will be redirected by onAuthStateChanged
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        // User will be redirected by onAuthStateChanged
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 p-8 rounded-lg backdrop-blur">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>

        <Button 
          onClick={handleGoogleSignIn}
          className="w-full mb-6 bg-white text-black hover:bg-gray-100"
        >
          Continue with Google
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-white/60">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          {isSignup ? 'Already have an account?' : "Don't have an account?"} 
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-white hover:underline"
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </Card>
    </div>
  );
}
/*