import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Mail, Phone, Globe, Star, Edit, Save, LucideTreePine } from 'lucide-react'

export function ClientProfile() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false)
  const [clientData, setClientData] = useState({
    name: "Jekes (Traveller profile)",
    company: "CA ",
    location: "Jaipur Rajasthan",
    email: "soft.doe@techcorp.com",
    phone: "+1 (555) 123-4567",
    website: "www.techcorp.com",
    bio: "Innovative tech company specializing in cutting-edge software solutions. We're always looking for talented freelancers to join our projects.",
  })

  useEffect(() => {
    console.log(id);
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClientData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Updated client data:', clientData)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-green-100/95 backdrop-blur supports-[backdrop-filter]:bg-green-100/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <LucideTreePine className="h-6 w-6 text-green-700" />
              <span className="inline-block font-bold text-green-800">Rural Connect</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                to="/work"
                className="flex items-center text-sm font-medium text-green-700 transition-colors hover:text-green-900"
              >
                How It Works
              </Link>
              <Link
                to="/markets"
                className="flex items-center text-sm font-medium text-green-700 transition-colors hover:text-green-900"
              >
                Marketplace
              </Link>
              <Link
                to="/courses"
                className="flex items-center text-sm font-medium text-green-700 transition-colors hover:text-green-900"
              >
                Explore Courses
              </Link>
              <Link
                to="/explore"
                className="flex items-center text-sm font-medium text-green-700 transition-colors hover:text-green-900"
              >
                Community
              </Link>
              <Link
                to="#"
                className="flex items-center text-sm font-medium text-green-700 transition-colors hover:text-green-900"
              >
                Support
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                <Link to="/">Logout</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?text=JD" alt={clientData.name} />
                <AvatarFallback>{clientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center sm:text-left">
                <CardTitle className="text-2xl mb-2">{clientData.name}</CardTitle>
                <p className="text-green-500">{clientData.company}</p>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <MapPin className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-500">{clientData.location}</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>

              <Link to={`/dashboard/client/${id}`}>
                <Button>
                  View Dashboard
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="about" className="mt-6">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="courses">My Courses</TabsTrigger>
                  <TabsTrigger value="visits">My Visits</TabsTrigger>
                  <TabsTrigger value="orders">My Orders</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={clientData.bio}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            value={clientData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={clientData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={clientData.website}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{clientData.bio}</p>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-green-400 mr-2" />
                          <span>{clientData.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-green-400 mr-2" />
                          <span>{clientData.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-green-400 mr-2" />
                          <a href={`https://${clientData.website}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            {clientData.website}
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="courses">
                  <div className="space-y-4">
                    {['Sustainable Farming Techniques', 'Introduction to Rural Entrepreneurship', 'Agro-Tourism: Connecting Farms and Travelers'].map((course, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-green-800">{course}</h3>
                          <p className="text-sm text-green-500">Completed: {new Date().toLocaleDateString()}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-green-400 mr-1" />
                            <span className="text-sm">4.{9 - index} ({20 - index} reviews)</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="visits">
                  <div className="space-y-4">
                    {['Visit to Organic Farm', 'Tour of Rural Artisan Workshop', 'Sustainable Forestry Demonstration'].map((visit, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-green-800">{visit}</h3>
                          <p className="text-sm text-green-500">Completed: {new Date().toLocaleDateString()}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-green-400 mr-1" />
                            <span className="text-sm">4.{9 - index} ({20 - index} reviews)</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="orders">
                  <div className="space-y-4">
                    {['Handwoven Bamboo Basket', 'Organic Millet Pack', 'Hand-painted Terracotta Pots'].map((visit, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-green-800">{visit}</h3>
                          <p className="text-sm text-green-500">Status:Delivered {new Date().toLocaleDateString()}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-green-400 mr-1" />
                            <span className="text-sm">4.{9 - index} ({20 - index} reviews)</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="space-y-4">
                    {['Alice', 'Bob', 'Carol'].map((reviewer, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center mb-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{reviewer[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-green-800">{reviewer}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < 5 - index * 0.5 ? 'text-green-400' : 'text-gray-300'}`} fill="currentColor" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-green-600">
                            {index === 0 ? "Great client to work with! Clear communication and timely payments." :
                              index === 1 ? "Challenging project but very rewarding. Would love to collaborate again." :
                                "Professional and respectful. Highly recommended!"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="badges">
                  <div className="space-y-4">
                    {['Sustainable Farming Certification', 'Rural Entrepreneurship Award', 'Agro-Tourism Ambassador'].map((badge, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={`/badges/${index + 1}.svg`} alt={badge} />
                            <AvatarFallback>{badge[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-green-800">{badge}</p>
                            <p className="text-sm text-green-500">Awarded on {new Date().toLocaleDateString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}