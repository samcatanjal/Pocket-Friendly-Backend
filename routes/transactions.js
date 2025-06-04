const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user transactions
router.get('/userdata', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json({ transactions });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a transaction
router.post('/transaction', authMiddleware, async (req, res) => {
  const { description, amount, type } = req.body;
  try {
    const newTransaction = new Transaction({ userId: req.userId, description, amount, type });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
