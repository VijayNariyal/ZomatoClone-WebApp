import express from 'express';
import Review from '../models/Review.js';
import Restaurant from '../models/Restaurant.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Create review
router.post('/', authenticate, async (req, res) => {
  try {
    const { restaurant, rating, comment } = req.body;

    // Check if user already reviewed this restaurant
    const existingReview = await Review.findOne({
      user: req.user._id,
      restaurant,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this restaurant' });
    }

    // Create review
    const review = new Review({
      user: req.user._id,
      restaurant,
      rating,
      comment,
    });

    await review.save();

    // Update restaurant rating
    const reviews = await Review.find({ restaurant });
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    await Restaurant.findByIdAndUpdate(restaurant, {
      rating: Math.round(avgRating * 10) / 10,
    });

    await review.populate('user', 'name');
    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;