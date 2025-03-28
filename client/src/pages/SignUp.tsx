import axios from 'axios';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const naviagator = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      accountType: 'client' // Default account type for signup
    });
    const [isLoginMode, setIsLoginMode] = useState(true); // Track if in login or signup mode
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      console.log(formData); // Log form data after change
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
        const response = await axios.post("http://localhost:7000/api/users/login", {
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
        const response = await axios.post("http://localhost:7000/api/users/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType
        });
  
        alert('Account created successfully!');
        const res = response.data;
        if(formData.accountType =="client"){
          naviagator(`/profile/client/${res.userId}`)
        }else if(formData.accountType =="freelancer"){

          naviagator(`/profile/gig/${res.userId}`)
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
        <Card className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={() => { setIsLoginMode(true); setFormData({ name: '', email: '', password: '', accountType: 'client' }); }}>Login</TabsTrigger>
              <TabsTrigger value="signup" onClick={() => { setIsLoginMode(false); setFormData({ name: '', email: '', password: '', accountType: 'client' }); }}>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" name="email" type="email" placeholder="m@example.com" required onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" required onChange={handleChange} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create an account to start freelancing or hiring.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" name="name" placeholder="John Doe" required onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="m@example.com" required onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" required onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup defaultValue={formData.accountType} onValueChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))} className="flex">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="client" id="client" />
                        <Label htmlFor="client">Client</Label>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <RadioGroupItem value="freelancer" id="freelancer" />
                        <Label htmlFor="freelancer">Freelancer</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    );
  }