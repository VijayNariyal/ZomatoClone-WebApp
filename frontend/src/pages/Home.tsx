import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  city: string;
  rating: number;
  deliveryTime: string;
  image: string;
  featured: boolean;
}

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchFeaturedRestaurants();
  }, []);

  const fetchFeaturedRestaurants = async () => {
    try {
      const response = await axios.get('/restaurants?featured=true');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  const cuisines = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Continental', 'Fast Food'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover the best food & drinks in your city
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
              Order from your favorite restaurants and get it delivered fresh
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl animate-slide-up">
              <div className="flex-1 flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 ml-4" />
                <select 
                  className="flex-1 p-3 text-gray-700 bg-transparent focus:outline-none"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="flex-2 flex items-center border-l border-gray-200">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines..."
                  className="flex-1 p-3 text-gray-700 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link 
                to={`/restaurants?search=${searchTerm}&city=${selectedCity}`}
                className="bg-primary-500 hover:bg-primary-600 px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Order</h3>
              <p className="text-gray-600">Browse through our wide variety of restaurants and cuisines</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered hot and fresh within 30 minutes</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">Only the best restaurants and highest quality ingredients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Cuisines</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cuisines.map((cuisine) => (
              <Link
                key={cuisine}
                to={`/restaurants?cuisine=${cuisine}`}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{cuisine}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <Link to="/restaurants" className="text-primary-500 hover:text-primary-600 font-semibold">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.slice(0, 6).map((restaurant) => (
              <Link
                key={restaurant._id}
                to={`/restaurant/${restaurant._id}`}
                className="restaurant-card group"
              >
                <div className="relative mb-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {restaurant.rating}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.city}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.deliveryTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;