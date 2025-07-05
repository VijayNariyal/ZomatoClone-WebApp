import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
  },
  description: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.0,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$'],
    default: '$$',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  menu: [menuItemSchema],
}, {
  timestamps: true,
});

export default mongoose.model('Restaurant', restaurantSchema);