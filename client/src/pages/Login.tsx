import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer', // Default role for signup
  });
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginMode) {
      await handleSignup();
      
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/users/login', {
        email: formData.email,
        password: formData.password,
      });

      alert('Logged in successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/users/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert('Account created successfully!');
      const res = response.data;

      // Conditional navigation based on user role
      if (formData.role === 'buyer') {
        navigator(`/profile/client/${res.userId}`);
      } else if (formData.role === 'rural') {
        navigator(`/profile/gig/${res.userId}`);
      } else if (formData.role === 'tourism') {
        navigator(`/profile/tourism/${res.userId}`);
      } else if (formData.role === 'user') {
        navigator(`/profile/gig/${res.userId}`);
      } else if (formData.role === 'seller') {
        navigator(`/profile/seller/${res.userId}`);
      } else if (formData.role === 'guide') {
        navigator(`/profile/guide/${res.userId}`);
      } else if (formData.role === 'institute') {
        navigator(`/profile/institute/${res.userId}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md bg-green-50 border-green-200">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="login"
              onClick={() => {
                setIsLoginMode(true);
                setFormData({ name: '', email: '', password: '', role: 'buyer' });
              }}
              className="bg-green-200 text-green-900 hover:bg-green-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              onClick={() => {
                setIsLoginMode(false);
                setFormData({ name: '', email: '', password: '', role: 'buyer' });
              }}
              className="bg-green-200 text-green-900 hover:bg-green-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-green-900">Login</CardTitle>
                <CardDescription className="text-green-700">
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-green-900">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-green-900">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-green-900">Sign Up</CardTitle>
                <CardDescription className="text-green-700">
                  Create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-green-900">
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    name="name"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-green-900">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-green-900">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-green-900">Account Role</Label>
                  <RadioGroup
                    defaultValue={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="buyer" />
                      <Label htmlFor="buyer" className="text-green-900">Traveller</Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user" className="text-green-900">Guide</Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller" className="text-green-900">Institute</Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="guide" id="guide" />
                      <Label htmlFor="guide" className="text-green-900">Seller</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
