import express from 'express';
import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Create order
router.post('/', authenticate, async (req, res) => {
  try {
    const { items, totalAmount, restaurant } = req.body;

    // Validate restaurant exists
    const restaurantDoc = await Restaurant.findById(restaurant);
    if (!restaurantDoc) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Create order with menu item names
    const orderItems = [];
    for (const item of items) {
      const menuItem = restaurantDoc.menu.id(item.menuItem);
      if (menuItem) {
        orderItems.push({
          menuItem: item.menuItem,
          name: menuItem.name,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }

    const order = new Order({
      user: req.user._id,
      restaurant,
      items: orderItems,
      totalAmount,
    });

    await order.save();
    await order.populate('restaurant', 'name image city');
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('restaurant', 'name image city')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (Admin only)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('restaurant', 'name image city');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;