import React from 'react';
import img2 from '../assets/basket.png';
import img3 from '../assets/honey.png';
import img4 from '../assets/pot.png';
import img5 from '../assets/bag.png';
import img6 from '../assets/eco.png';
import img7 from '../assets/seed.png';
import { ChevronLeft, ShoppingCart, Search, Menu } from 'lucide-react';

const BrowseProducts = () => {
  const products = [
    {
      id: 1,
      name: "Handwoven Bamboo Basket",
      price: 499,
      image: img2,
      artisan: "Lakshmi Devi",
      village: "Madanapalle, AP"
    },
    {
      id: 2,
      name: "Organic Wild Honey",
      price: 299,
      image: img3,
      artisan: "Tribal Cooperative",
      village: "Araku Valley"
    },
    {
      id: 3,
      name: "Hand-painted Terracotta Pots",
      price: 399,
      image: img4,
      artisan: "Ram Kumar",
      village: "Kutch, Gujarat"
    },
    {
      id: 4,
      name: "Traditional Jute Bags",
      price: 199,
      image: img5,
      artisan: "Women's SHG",
      village: "Sundarbans, WB"
    },
    {
      id: 5,
      name: "Brass Bell Series",
      price: 599,
      image: img7,
      artisan: "Mohan Crafts",
      village: "Moradabad, UP"
    },
    {
      id: 6,
      name: "Organic Millet Pack",
      price: 249,
      image: img6,
      artisan: "Farmers Collective",
      village: "Anantapur, AP"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="hover:bg-green-700 p-2 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">RuralConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Search size={24} />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full">
              <ShoppingCart size={24} />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Browse Rural Products</h2>
          <p className="text-gray-600">Discover authentic crafts and products from rural artisans</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">By {product.artisan}</p>
                <p className="text-xs text-gray-500">{product.village}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    Buy Now
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
              <h3 className="text-lg font-semibold mb-4">About RuralConnect</h3>
              <p className="text-gray-400">Bridging the gap between rural artisans and urban markets, promoting sustainable livelihoods.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Artisans</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@ruralconnect.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 RuralConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrowseProducts;