import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodhub';

const sampleRestaurants = [
  {
    name: "Spice Garden",
    description: "Authentic Indian cuisine with traditional spices and flavors. Experience the rich taste of India with our carefully crafted dishes.",
    cuisine: "North Indian",
    city: "Mumbai",
    address: "123 MG Road, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 98765 43210",
    rating: 4.5,
    deliveryTime: "25-35 mins",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    priceRange: "$$",
    featured: true,
    menu: [
      {
        name: "Butter Chicken",
        description: "Tender chicken cooked in rich tomato and butter sauce with aromatic spices",
        price: 320,
        category: "Main Course",
        image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
        isVeg: false
      },
      {
        name: "Paneer Tikka Masala",
        description: "Grilled cottage cheese cubes in creamy tomato gravy",
        price: 280,
        category: "Main Course",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        isVeg: true
      },
      {
        name: "Garlic Naan",
        description: "Freshly baked bread with garlic and herbs",
        price: 80,
        category: "Breads",
        image: "https://images.pexels.com/photos/6249525/pexels-photo-6249525.jpeg",
        isVeg: true
      },
      {
        name: "Biryani",
        description: "Fragrant basmati rice cooked with aromatic spices and tender meat",
        price: 380,
        category: "Rice",
        image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg",
        isVeg: false
      },
      {
        name: "Mango Lassi",
        description: "Refreshing yogurt drink with fresh mango pulp",
        price: 120,
        category: "Beverages",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Dragon Palace",
    description: "Exquisite Chinese cuisine with authentic flavors from the heart of China. Fresh ingredients and traditional cooking methods.",
    cuisine: "Chinese",
    city: "Delhi",
    address: "456 Connaught Place, New Delhi, Delhi 110001",
    phone: "+91 87654 32109",
    rating: 4.3,
    deliveryTime: "30-40 mins",
    image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
    priceRange: "$$",
    featured: true,
    menu: [
      {
        name: "Kung Pao Chicken",
        description: "Spicy stir-fried chicken with peanuts and vegetables",
        price: 350,
        category: "Main Course",
        image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg",
        isVeg: false
      },
      {
        name: "Mapo Tofu",
        description: "Silky tofu in spicy Sichuan sauce",
        price: 280,
        category: "Main Course",
        image: "https://images.pexels.com/photos/4202511/pexels-photo-4202511.jpeg",
        isVeg: true
      },
      {
        name: "Fried Rice",
        description: "Wok-fried rice with vegetables and soy sauce",
        price: 220,
        category: "Rice",
        image: "https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Pasta La Vista",
    description: "Authentic Italian pasta and pizza made with imported ingredients and traditional recipes from Italy.",
    cuisine: "Italian",
    city: "Bangalore",
    address: "789 Brigade Road, Bangalore, Karnataka 560025",
    phone: "+91 76543 21098",
    rating: 4.6,
    deliveryTime: "20-30 mins",
    image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg",
    priceRange: "$$$",
    featured: true,
    menu: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
        price: 420,
        category: "Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
        isVeg: true
      },
      {
        name: "Carbonara Pasta",
        description: "Creamy pasta with bacon, eggs, and parmesan cheese",
        price: 380,
        category: "Pasta",
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
        isVeg: false
      },
      {
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee and mascarpone",
        price: 180,
        category: "Desserts",
        image: "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Curry Express",
    description: "Fast and flavorful South Indian dishes prepared with authentic spices and coconut-based gravies.",
    cuisine: "South Indian",
    city: "Chennai",
    address: "321 T. Nagar, Chennai, Tamil Nadu 600017",
    phone: "+91 65432 10987",
    rating: 4.2,
    deliveryTime: "15-25 mins",
    image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
    priceRange: "$",
    featured: false,
    menu: [
      {
        name: "Masala Dosa",
        description: "Crispy rice pancake filled with spiced potato curry",
        price: 120,
        category: "Main Course",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        isVeg: true
      },
      {
        name: "Sambar Rice",
        description: "Rice served with lentil curry and vegetables",
        price: 100,
        category: "Rice",
        image: "https://images.pexels.com/photos/1630309/pexels-photo-1630309.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Burger Junction",
    description: "Gourmet burgers and fast food favorites made with premium ingredients and served fresh.",
    cuisine: "Fast Food",
    city: "Mumbai",
    address: "654 Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 54321 09876",
    rating: 4.0,
    deliveryTime: "15-20 mins",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    priceRange: "$",
    featured: false,
    menu: [
      {
        name: "Classic Cheeseburger",
        description: "Beef patty with cheese, lettuce, tomato, and sauce",
        price: 250,
        category: "Burgers",
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        isVeg: false
      },
      {
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables",
        price: 220,
        category: "Burgers",
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        isVeg: true
      },
      {
        name: "French Fries",
        description: "Crispy golden fries with seasoning",
        price: 120,
        category: "Sides",
        image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Continental Delights",
    description: "European cuisine with modern presentation. Featuring dishes from various continental regions.",
    cuisine: "Continental",
    city: "Delhi",
    address: "987 Khan Market, New Delhi, Delhi 110003",
    phone: "+91 43210 98765",
    rating: 4.4,
    deliveryTime: "35-45 mins",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    priceRange: "$$$",
    featured: false,
    menu: [
      {
        name: "Grilled Salmon",
        description: "Fresh salmon grilled to perfection with herbs",
        price: 650,
        category: "Main Course",
        image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
        isVeg: false
      },
      {
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with caesar dressing and croutons",
        price: 320,
        category: "Salads",
        image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
        isVeg: true
      }
    ]
  }
];

const sampleUsers = [
  {
    name: "Demo User",
    email: "user@demo.com",
    password: "password",
    isAdmin: false
  },
  {
    name: "Admin User",
    email: "admin@demo.com",
    password: "password",
    isAdmin: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    await User.insertMany(sampleUsers);
    console.log('Created sample users');

    // Create restaurants
    await Restaurant.insertMany(sampleRestaurants);
    console.log('Created sample restaurants');

    console.log('Database seeding completed successfully!');
    console.log('\nDemo accounts:');
    console.log('User: user@demo.com / password');
    console.log('Admin: admin@demo.com / password');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();