import express from 'express';
import Order from '../models/Order.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all orders (Admin only)
router.get('/orders', authenticate, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;