# FoodHub - Zomato Clone

A full-stack restaurant discovery and food ordering platform built with React, Node.js, Express, and MongoDB.

### NOTE 
This is the continue MERN web application for the Full-zomato-WebApplication we have deployed. But this for the both Localhost and for the seprate VM(frontend and backend) where this application run. 

## 🚀 Features

### User Features
- **Authentication**: Secure user registration and login with JWT
- **Restaurant Discovery**: Browse restaurants by city, cuisine, and rating
- **Restaurant Details**: View menus, reviews, and restaurant information
- **Shopping Cart**: Add items to cart and place orders
- **Order History**: Track past orders and their status
- **Reviews & Ratings**: Leave reviews and ratings for restaurants

### Admin Features
- **Restaurant Management**: Add, update, and delete restaurants
- **Order Management**: View and update order status
- **Featured Restaurants**: Mark restaurants as featured
- **Analytics Dashboard**: View orders and restaurant statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Express Rate Limit** for API protection
- **Helmet** for security headers

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Docker & Docker Compose (for containerized deployment)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd foodhub
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Set up Environment Variables

#### For Local Development
```bash
# In the backend directory, create .env file
cp env.example .env

# Edit .env with your MongoDB connection string and JWT secret
MONGODB_URI=mongodb://localhost:27017/foodhub
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

#### For Docker Deployment (Same VM)
```bash
# In the root directory, create .env file
cp env.example .env

# Use default values for same VM deployment
BACKEND_URL=http://localhost:5000/api
FRONTEND_URL=http://localhost:3000
```

#### For Docker Deployment (Separate VMs)
```bash
# In the root directory, create .env file
cp env.example .env

# Edit with your VM IP addresses or domain names
BACKEND_URL=http://192.168.1.100:5000/api  # Backend VM IP
FRONTEND_URL=http://192.168.1.101:3000     # Frontend VM IP

# Or with domain names:
# BACKEND_URL=https://api.yourdomain.com/api
# FRONTEND_URL=https://app.yourdomain.com
```

### 4. Seed the Database
```bash
# From the backend directory
npm run seed
```
```bash
# From the docker container
docker exec -itd foodhub-backend npm run seed
```
This will create sample restaurants and demo user accounts:
- **User**: user@demo.com / password
- **Admin**: admin@demo.com / password

## 🚀 Deployment Options

### Option 1: Local Development
```bash
# From the root directory, start both frontend and backend
npm run dev

# Or start them separately:
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm run dev
```

### Option 2: Docker Compose (Same VM)
```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 3: Docker Compose (Separate VMs)

#### On Backend VM:
```bash
# Create .env file with appropriate URLs
echo "BACKEND_URL=http://YOUR_BACKEND_VM_IP:5000/api" > .env
echo "FRONTEND_URL=http://YOUR_FRONTEND_VM_IP:3000" >> .env

# Start only backend and database services
docker-compose up -d mongodb backend
```

#### On Frontend VM:
```bash
# Create .env file with backend VM IP
echo "BACKEND_URL=http://YOUR_BACKEND_VM_IP:5000/api" > .env
echo "FRONTEND_URL=http://YOUR_FRONTEND_VM_IP:3000" >> .env

# Start only frontend service
docker-compose up -d frontend
```

### Option 4: Individual Docker Containers

#### Backend Container:
```bash
# Build backend image
docker build -t foodhub-backend ./backend

# Run backend container
docker run -d \
  --name foodhub-backend \
  -p 5000:5000 \
  -e MONGODB_URI="mongodb://YOUR_MONGO_HOST:27017/foodhub" \
  -e JWT_SECRET="your-secret-key" \
  -e CORS_ORIGIN="http://YOUR_FRONTEND_VM_IP:3000" \
  foodhub-backend
```

#### Frontend Container:
```bash
# Build frontend image with backend URL
docker build -t foodhub-frontend \
  --build-arg VITE_API_URL="http://YOUR_BACKEND_VM_IP:5000/api" \
  ./frontend

# Run frontend container
docker run -d \
  --name foodhub-frontend \
  -p 3000:80 \
  foodhub-frontend
```

## 🌐 Network Configuration

### Firewall Rules
Make sure the following ports are open:

#### Backend VM:
- Port 5000 (API server)
- Port 27017 (MongoDB, if external access needed)

#### Frontend VM:
- Port 3000 (Web server)

### Security Considerations
- Use HTTPS in production
- Configure proper firewall rules
- Use environment-specific secrets
- Enable MongoDB authentication
- Use reverse proxy (nginx) for production

## 🗂️ Project Structure

```
foodhub/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── Dockerfile          # Frontend container config
│   └── package.json
├── backend/                  # Node.js backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Database scripts
│   ├── Dockerfile          # Backend container config
│   └── package.json
├── docker-compose.yml       # Multi-container orchestration
├── .env.example            # Environment variables template
├── package.json            # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with filters)
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (Admin only)
- `PUT /api/restaurants/:id` - Update restaurant (Admin only)
- `DELETE /api/restaurants/:id` - Delete restaurant (Admin only)

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/restaurant/:id` - Get restaurant reviews

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id` - Update order status (Admin only)

### Admin
- `GET /api/admin/orders` - Get all orders (Admin only)

### Health Check
- `GET /health` - Server health status

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Color System**: Carefully chosen color palette with proper contrast
- **Typography**: Inter font family with proper hierarchy
- **Micro-interactions**: Hover effects and smooth transitions
- **Loading States**: Skeleton loading and progress indicators

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Protection against API abuse
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints at:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## 🔧 Troubleshooting

### Common Issues

#### CORS Errors
- Ensure `FRONTEND_URL` environment variable is set correctly in backend
- Check that frontend is accessing the correct backend URL

#### Connection Refused
- Verify backend VM IP address and port accessibility
- Check firewall rules on both VMs
- Ensure services are running on correct ports

#### MongoDB Connection Issues
- Verify MongoDB is running and accessible
- Check MongoDB URI format and credentials
- Ensure network connectivity between backend and database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images from [Pexels](https://pexels.com) for restaurant and food photos
- Icons from [Lucide React](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

## 📞 Support

For support, email support@foodhub.com or create an issue in the repository.
