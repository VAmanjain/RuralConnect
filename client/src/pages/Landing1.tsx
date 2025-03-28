import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, MessageCircle, Shield, Star, Users, Map, Camera, Tent, TreePalm, LucideTreePine, Quote  } from "lucide-react"
import { Link } from "react-router-dom"
import img1 from '../assets/img1.png'
import doImage from '../assets/test.webp'
import img2 from '../assets/mainny.png'

export default function LandingPage1() {
  const testimonials = [
    {
      text: "RuralConnect helped me discover amazing local craftsmen in my area. The cultural workshops were life-changing!",
      author: "Sarah Mitchell",
      role: "Travel Enthusiast",
      location: "Colorado"
    },
    {
      text: "As a local guide, this platform has helped me share my community's rich heritage with respectful travelers.",
      author: "James Thompson",
      role: "Local Guide",
      location: "Vermont"
    },
    {
      text: "The eco-friendly stays perfectly balanced comfort with environmental consciousness. A truly authentic experience!",
      author: "Emma Rodriguez",
      role: "Environmental Blogger",
      location: "Montana"
    }
  ]

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
                <Link to="/login">
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img src={img2} alt="Hero" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last" height="550" width="550" />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800">
                    Discover Rural Wonders with RuralConnect
                  </h1>
                  <p className="max-w-[600px] text-green-700 md:text-xl">
                    Connect with authentic rural experiences and support local communities. Your gateway to sustainable tourism.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white" size="lg">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-green-700 border-green-600 hover:bg-green-100">
                    Host an Experience
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-green-800">Key Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-green-200 border p-4 rounded-lg">
                <Map className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Interactive Rural Maps</h3>
                <p className="text-sm text-green-600 text-center">
                  Explore hidden gems with our detailed maps of rural attractions and accommodations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 border p-4 rounded-lg">
                <Camera className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Virtual Tours</h3>
                <p className="text-sm text-green-600 text-center">
                  Experience rural destinations from home with our immersive 360° virtual tours.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 border p-4 rounded-lg">
                <Users className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Local Guide Connections</h3>
                <p className="text-sm text-green-600 text-center">
                  Connect with knowledgeable local guides for authentic rural experiences.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 border p-4 rounded-lg">
                <Tent className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Eco-Friendly Stays</h3>
                <p className="text-sm text-green-600 text-center">
                  Book sustainable accommodations that support local communities and the environment.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 border p-4 rounded-lg">
                <Star className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Cultural Workshops</h3>
                <p className="text-sm text-green-600 text-center">
                  Participate in hands-on workshops to learn traditional rural crafts and skills.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 border p-4 rounded-lg">
                <MessageCircle className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Community Forums</h3>
                <p className="text-sm text-green-600 text-center">
                  Share experiences and get tips from fellow rural tourism enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-green-800">
              What Our Community Says
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col space-y-4 bg-white p-6 rounded-xl shadow-sm border border-green-100">
                  <Quote className="h-8 w-8 text-green-600" />
                  <p className="text-green-700 flex-1">"{testimonial.text}"</p>
                  <div className="border-t border-green-100 pt-4">
                    <p className="font-bold text-green-800">{testimonial.author}</p>
                    <p className="text-sm text-green-600">{testimonial.role}</p>
                    <p className="text-sm text-green-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Rest of the sections... */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">Join Our Rural Adventure Community</h2>
                <p className="max-w-[900px] text-green-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover hidden rural treasures, support local communities, and create unforgettable memories. Start your journey with RuralConnect today!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 border-green-300 focus:border-green-500" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Join Now</Button>
                </form>
                <p className="text-xs text-green-600">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-green-800" to="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-200 bg-green-50">
        <p className="text-xs text-green-600">© 2024 RuralConnect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-green-700" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-green-700" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

