import React, { useState } from 'react';
import { ChevronLeft, Store, ShoppingBag, Map, BookOpen, ArrowRight, Phone, Camera, Truck, CreditCard, Calendar, Award } from 'lucide-react';

const HowItWorks = () => {
  const [selectedTab, setSelectedTab] = useState('seller');

  const tabs = [
    { id: 'seller', label: 'For Sellers', icon: Store },
    { id: 'buyer', label: 'For Buyers', icon: ShoppingBag },
    { id: 'guide', label: 'For Guides', icon: Map },
    { id: 'learner', label: 'For Learners', icon: BookOpen }
  ];

  const processSteps = {
    seller: [
      {
        title: "Create Your Account",
        description: "Sign up with your phone number and complete identity verification",
        icon: Phone,
        details: ["Add personal details", "Verify identity with Aadhaar", "Add bank account for payments"]
      },
      {
        title: "List Your Products",
        description: "Add your handmade products with photos and descriptions",
        icon: Camera,
        details: ["Take clear photos", "Set fair prices", "Describe product details", "Mention available quantity"]
      },
      {
        title: "Manage Orders",
        description: "Receive orders and handle shipping",
        icon: Truck,
        details: ["Get SMS notifications", "Package items safely", "Ship through our partners", "Track deliveries"]
      }
    ],
    buyer: [
      {
        title: "Browse Local Products",
        description: "Explore authentic handmade items from rural artisans",
        icon: ShoppingBag,
        details: ["Filter by category", "Read product details", "Check seller ratings", "View authentic photos"]
      },
      {
        title: "Safe Payment",
        description: "Pay securely using multiple payment options",
        icon: CreditCard,
        details: ["UPI payments", "Card payments", "Cash on delivery", "Money-back guarantee"]
      },
      {
        title: "Receive Products",
        description: "Get products delivered to your doorstep",
        icon: Truck,
        details: ["Track shipment", "Quality check", "Easy returns", "Rate your experience"]
      }
    ],
    guide: [
      {
        title: "Register as Guide",
        description: "Create your profile with experience and expertise",
        icon: Award,
        details: ["Add qualifications", "List languages known", "Specify expertise areas", "Upload certificates"]
      },
      {
        title: "Create Experiences",
        description: "Design unique local experiences and tours",
        icon: Map,
        details: ["Set tour details", "Add itinerary", "Set group sizes", "Define pricing"]
      },
      {
        title: "Manage Bookings",
        description: "Handle tour bookings and schedules",
        icon: Calendar,
        details: ["Accept bookings", "Set availability", "Communicate with guests", "Receive payments"]
      }
    ],
    learner: [
      {
        title: "Explore Courses",
        description: "Find courses in your preferred language",
        icon: BookOpen,
        details: ["Browse categories", "Check course details", "Read reviews", "Free previews"]
      },
      {
        title: "Easy Enrollment",
        description: "Join courses with simple enrollment process",
        icon: CreditCard,
        details: ["Flexible payments", "EMI options", "Mobile-friendly", "Download content"]
      },
      {
        title: "Learn & Grow",
        description: "Complete courses and earn certificates",
        icon: Award,
        details: ["Watch videos", "Complete assignments", "Ask doubts", "Get certified"]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="hover:bg-green-700 p-2 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">How It Works</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`flex items-center px-6 py-3 rounded-lg ${
                selectedTab === id 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-green-50'
              } shadow-sm transition-colors duration-200`}
            >
              <Icon size={20} className="mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Process Steps */}
        <div className="space-y-6">
          {processSteps[selectedTab].map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg">
                  <step.icon size={24} className="text-green-600" />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <ArrowRight size={16} className="mr-2 text-green-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;