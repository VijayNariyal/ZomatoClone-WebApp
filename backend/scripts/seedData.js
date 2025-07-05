import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import Order from '../models/Order.js';
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
      },
      {
        name: "Sweet and Sour Pork",
        description: "Crispy pork with bell peppers in tangy sauce",
        price: 380,
        category: "Main Course",
        image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg",
        isVeg: false
      },
      {
        name: "Hot and Sour Soup",
        description: "Traditional Chinese soup with mushrooms and tofu",
        price: 150,
        category: "Soups",
        image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
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
      },
      {
        name: "Pepperoni Pizza",
        description: "Classic pizza with pepperoni and mozzarella cheese",
        price: 480,
        category: "Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
        isVeg: false
      },
      {
        name: "Alfredo Pasta",
        description: "Creamy white sauce pasta with herbs",
        price: 350,
        category: "Pasta",
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
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
      },
      {
        name: "Idli Sambar",
        description: "Steamed rice cakes with lentil curry",
        price: 80,
        category: "Breakfast",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        isVeg: true
      },
      {
        name: "Coconut Chutney",
        description: "Fresh coconut chutney with curry leaves",
        price: 40,
        category: "Sides",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
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
      },
      {
        name: "Chicken Wings",
        description: "Spicy buffalo chicken wings",
        price: 280,
        category: "Appetizers",
        image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg",
        isVeg: false
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
      },
      {
        name: "Beef Steak",
        description: "Tender beef steak with mashed potatoes",
        price: 750,
        category: "Main Course",
        image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg",
        isVeg: false
      }
    ]
  },
  {
    name: "Sushi Zen",
    description: "Authentic Japanese sushi and sashimi prepared by expert chefs with the freshest ingredients.",
    cuisine: "Japanese",
    city: "Mumbai",
    address: "101 Marine Drive, Mumbai, Maharashtra 400020",
    phone: "+91 98765 12345",
    rating: 4.7,
    deliveryTime: "40-50 mins",
    image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
    priceRange: "$$$",
    featured: true,
    menu: [
      {
        name: "California Roll",
        description: "Crab, avocado, and cucumber roll with sesame seeds",
        price: 450,
        category: "Sushi",
        image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
        isVeg: false
      },
      {
        name: "Salmon Sashimi",
        description: "Fresh salmon slices served with wasabi and ginger",
        price: 520,
        category: "Sashimi",
        image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
        isVeg: false
      },
      {
        name: "Vegetable Tempura",
        description: "Crispy battered and fried seasonal vegetables",
        price: 380,
        category: "Appetizers",
        image: "https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg",
        isVeg: true
      },
      {
        name: "Miso Soup",
        description: "Traditional Japanese soup with tofu and seaweed",
        price: 180,
        category: "Soups",
        image: "https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Taco Fiesta",
    description: "Vibrant Mexican cuisine with authentic flavors, fresh ingredients, and traditional cooking methods.",
    cuisine: "Mexican",
    city: "Bangalore",
    address: "456 Koramangala, Bangalore, Karnataka 560034",
    phone: "+91 87654 98765",
    rating: 4.1,
    deliveryTime: "25-35 mins",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        name: "Chicken Tacos",
        description: "Grilled chicken with salsa, lettuce, and cheese in soft tortillas",
        price: 320,
        category: "Tacos",
        image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        isVeg: false
      },
      {
        name: "Vegetarian Burrito",
        description: "Black beans, rice, vegetables, and cheese wrapped in tortilla",
        price: 280,
        category: "Burritos",
        image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        isVeg: true
      },
      {
        name: "Guacamole",
        description: "Fresh avocado dip with lime, onions, and cilantro",
        price: 150,
        category: "Appetizers",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        isVeg: true
      },
      {
        name: "Nachos Supreme",
        description: "Crispy tortilla chips with cheese, jalapeños, and sour cream",
        price: 250,
        category: "Appetizers",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Thai Garden",
    description: "Authentic Thai cuisine with aromatic herbs, spices, and traditional cooking techniques from Thailand.",
    cuisine: "Thai",
    city: "Delhi",
    address: "789 Hauz Khas Village, New Delhi, Delhi 110016",
    phone: "+91 76543 87654",
    rating: 4.3,
    deliveryTime: "30-40 mins",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        name: "Pad Thai",
        description: "Stir-fried rice noodles with shrimp, tofu, and peanuts",
        price: 350,
        category: "Noodles",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        isVeg: false
      },
      {
        name: "Green Curry",
        description: "Spicy coconut curry with vegetables and Thai basil",
        price: 320,
        category: "Curries",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        isVeg: true
      },
      {
        name: "Tom Yum Soup",
        description: "Hot and sour soup with lemongrass and lime leaves",
        price: 220,
        category: "Soups",
        image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
        isVeg: true
      },
      {
        name: "Mango Sticky Rice",
        description: "Sweet sticky rice with fresh mango and coconut milk",
        price: 180,
        category: "Desserts",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Pizza Corner",
    description: "Wood-fired pizzas with fresh toppings and artisanal crusts. A perfect blend of traditional and modern flavors.",
    cuisine: "Italian",
    city: "Chennai",
    address: "234 Anna Nagar, Chennai, Tamil Nadu 600040",
    phone: "+91 65432 87654",
    rating: 4.2,
    deliveryTime: "20-30 mins",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        name: "Quattro Stagioni",
        description: "Four seasons pizza with ham, mushrooms, artichokes, and olives",
        price: 520,
        category: "Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
        isVeg: false
      },
      {
        name: "Vegetarian Supreme",
        description: "Loaded with bell peppers, mushrooms, onions, and olives",
        price: 450,
        category: "Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
        isVeg: true
      },
      {
        name: "Garlic Bread",
        description: "Crispy bread with garlic butter and herbs",
        price: 120,
        category: "Sides",
        image: "https://images.pexels.com/photos/6249525/pexels-photo-6249525.jpeg",
        isVeg: true
      },
      {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: 200,
        category: "Desserts",
        image: "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg",
        isVeg: true
      }
    ]
  },
  {
    name: "Biryani House",
    description: "Specializing in authentic Hyderabadi biryani and traditional Mughlai cuisine with aromatic spices.",
    cuisine: "Mughlai",
    city: "Hyderabad",
    address: "567 Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 54321 76543",
    rating: 4.6,
    deliveryTime: "35-45 mins",
    image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg",
    priceRange: "$$",
    featured: true,
    menu: [
      {
        name: "Hyderabadi Chicken Biryani",
        description: "Aromatic basmati rice with tender chicken and traditional spices",
        price: 420,
        category: "Biryani",
        image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg",
        isVeg: false
      },
      {
        name: "Mutton Biryani",
        description: "Slow-cooked mutton with fragrant rice and saffron",
        price: 480,
        category: "Biryani",
        image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg",
        isVeg: false
      },
      {
        name: "Vegetable Biryani",
        description: "Mixed vegetables with basmati rice and aromatic spices",
        price: 320,
        category: "Biryani",
        image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg",
        isVeg: true
      },
      {
        name: "Raita",
        description: "Cooling yogurt with cucumber and mint",
        price: 80,
        category: "Sides",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        isVeg: true
      },
      {
        name: "Kebab Platter",
        description: "Assorted grilled kebabs with mint chutney",
        price: 380,
        category: "Appetizers",
        image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
        isVeg: false
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
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    isAdmin: false
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    isAdmin: false
  },
  {
    name: "Mike Wilson",
    email: "mike@example.com",
    password: "password123",
    isAdmin: false
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    password: "password123",
    isAdmin: false
  }
];

async function createSampleOrders(users, restaurants) {
  const orders = [];
  const statuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
  
  // Create orders for the past 30 days
  for (let i = 0; i < 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
    
    // Select random menu items
    const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items
    const selectedItems = [];
    const usedItems = new Set();
    
    for (let j = 0; j < numItems; j++) {
      let menuItem;
      do {
        menuItem = restaurant.menu[Math.floor(Math.random() * restaurant.menu.length)];
      } while (usedItems.has(menuItem._id.toString()));
      
      usedItems.add(menuItem._id.toString());
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
      
      selectedItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        quantity: quantity,
        price: menuItem.price
      });
    }
    
    const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Random date within last 30 days
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
    
    orders.push({
      user: user._id,
      restaurant: restaurant._id,
      items: selectedItems,
      totalAmount: totalAmount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: randomDate,
      updatedAt: randomDate
    });
  }
  
  return orders;
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    const createdUsers = await User.insertMany(sampleUsers);
    console.log('Created sample users');

    // Create restaurants
    const createdRestaurants = await Restaurant.insertMany(sampleRestaurants);
    console.log('Created sample restaurants');

    // Create sample orders
    const sampleOrders = await createSampleOrders(createdUsers, createdRestaurants);
    await Order.insertMany(sampleOrders);
    console.log('Created sample orders');

    console.log('Database seeding completed successfully!');
    console.log(`\nCreated:`);
    console.log(`- ${createdUsers.length} users`);
    console.log(`- ${createdRestaurants.length} restaurants`);
    console.log(`- ${sampleOrders.length} orders`);
    console.log('\nDemo accounts:');
    console.log('User: user@demo.com / password');
    console.log('Admin: admin@demo.com / password');
    console.log('Additional users: john@example.com, sarah@example.com, mike@example.com, emily@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
