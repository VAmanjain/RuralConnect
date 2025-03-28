import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, BookOpen, Clock, Users } from 'lucide-react';
import cours1 from '../assets/course1.png';
import cours2 from '../assets/course2.png';
import cours3 from '../assets/course3.png';
const ExploreCourses = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      name: "Digital Payments & UPI",
      category: "Financial Literacy",
      duration: "2 weeks",
      language: "Hindi, English",
      enrolled: 1240,
      image: cours1,
      instructor: "Priya Sharma",
      price: 199,
      level: "Beginner"
    },
    {
      id: 2,
      name: "Smart Farming Techniques",
      category: "Agriculture",
      duration: "4 weeks",
      language: "Telugu, English",
      enrolled: 890,
      image: cours2,
      instructor: "Dr. Reddy",
      price: 299,
      level: "Intermediate"
    },
    {
      id: 3,
      name: "Online Banking Safety",
      category: "Financial Literacy",
      duration: "1 week",
      language: "Malayalam, English",
      enrolled: 2100,
      image: "/api/placeholder/300/200",
      instructor: "Rajesh Kumar",
      price: 149,
      level: "Beginner"
    },
    {
      id: 4,
      name: "Smartphone Basics",
      category: "Digital Skills",
      duration: "2 weeks",
      language: "Bengali, English",
      enrolled: 3400,
      image: cours3,
      instructor: "Amit Das",
      price: 99,
      level: "Beginner"
    },
    {
      id: 5,
      name: "Weather Apps for Farming",
      category: "Agriculture",
      duration: "1 week",
      language: "Marathi, English",
      enrolled: 670,
      image: "/api/placeholder/300/200",
      instructor: "Sanjay Patil",
      price: 199,
      level: "Beginner"
    },
    {
      id: 6,
      name: "Government Schemes & Apps",
      category: "Digital Skills",
      duration: "3 weeks",
      language: "Kannada, English",
      enrolled: 1560,
      image: "/api/placeholder/300/200",
      instructor: "Lakshmi N",
      price: 249,
      level: "Intermediate"
    }
  ];

  const categories = ["All", "Financial Literacy", "Digital Skills", "Agriculture"];

  const handleEnroll = (courseId) => {
    // Navigate to course detail or enrollment page
    navigate(`/course/${courseId}/enroll`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:bg-green-700 p-2 rounded-full">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">RuralConnect Learning</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/search" className="hover:bg-green-700 p-2 rounded-full">
              <Search size={24} />
            </Link>
            <Link to="/my-courses" className="hover:bg-green-700 p-2 rounded-full">
              <BookOpen size={24} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Explore Courses</h2>
          <p className="text-gray-600">Learn essential digital, financial, and agricultural skills</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/courses/${category.toLowerCase()}`)}
              className="px-4 py-2 rounded-full text-sm bg-green-50 text-green-600 hover:bg-green-100"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mt-2">{course.name}</h3>
                <p className="text-sm text-gray-600">By {course.instructor}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={16} className="mr-2" />
                    {course.enrolled.toLocaleString()} students
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">₹{course.price}</span>
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About RuralConnect Learning</h3>
              <p className="text-gray-400">Empowering rural communities with essential digital, financial, and agricultural knowledge.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/free-courses" className="hover:text-white">Free Courses</Link></li>
                <li><Link to="/success-stories" className="hover:text-white">Success Stories</Link></li>
                <li><Link to="/learning-paths" className="hover:text-white">Learning Paths</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: learn@ruralconnect.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>WhatsApp: +91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 RuralConnect Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExploreCourses;