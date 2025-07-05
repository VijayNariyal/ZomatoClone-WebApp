import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
}

interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  city: string;
  address: string;
  phone: string;
  rating: number;
  deliveryTime: string;
  image: string;
  priceRange: string;
  description: string;
  menu: MenuItem[];
  reviews: Review[];
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`/restaurants/${id}`);
      setRestaurant(response.data);
      if (response.data.menu.length > 0) {
        const categories = [...new Set(response.data.menu.map((item: MenuItem) => item.category))];
        setActiveCategory(categories[0]);
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      restaurant: restaurant!._id,
      restaurantName: restaurant!.name,
    });
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error('Please login to leave a review');
      return;
    }

    try {
      await axios.post('/reviews', {
        restaurant: id,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      fetchRestaurant(); // Refresh to show new review
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 w-full h-64 rounded-xl mb-8"></div>
          <div className="bg-gray-200 h-8 rounded mb-4"></div>
          <div className="bg-gray-200 h-6 rounded mb-4"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500 text-lg">Restaurant not found</p>
      </div>
    );
  }

  const categories = [...new Set(restaurant.menu.map(item => item.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Restaurant Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-xl">{restaurant.cuisine}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-gray-500">({restaurant.reviews.length} reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{restaurant.city}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{restaurant.phone}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-600">{restaurant.description}</p>
            <p className="text-sm text-gray-500 mt-2">{restaurant.address}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeCategory === category
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 hover:text-primary-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Menu Items */}
            <div className="space-y-4">
              {restaurant.menu
                .filter(item => item.category === activeCategory)
                .map(item => (
                  <div key={item._id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            {item.name}
                            <span className={`ml-2 w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                          <p className="font-semibold text-primary-500 mt-2">₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {user && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="btn-primary"
                >
                  Write Review
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="input-field"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Share your experience..."
                  />
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleSubmitReview} className="btn-primary">
                    Submit
                  </button>
                  <button onClick={() => setShowReviewForm(false)} className="btn-outline">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {restaurant.reviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews yet</p>
              ) : (
                restaurant.reviews.map(review => (
                  <div key={review._id} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{review.user.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;