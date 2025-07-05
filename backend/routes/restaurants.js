import express from 'express';
import Restaurant from '../models/Restaurant.js';
import Review from '../models/Review.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all restaurants with filtering
router.get('/', async (req, res) => {
  try {
    const { search, city, cuisine, rating, priceRange, featured } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (city) query.city = city;
    if (cuisine) query.cuisine = cuisine;
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (priceRange) query.priceRange = priceRange;
    if (featured === 'true') query.featured = true;

    const restaurants = await Restaurant.find(query).sort({ rating: -1 });
    res.json(restaurants);
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get restaurant by ID with reviews
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const reviews = await Review.find({ restaurant: req.params.id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ ...restaurant.toObject(), reviews });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create restaurant (Admin only)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update restaurant (Admin only)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete restaurant (Admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;