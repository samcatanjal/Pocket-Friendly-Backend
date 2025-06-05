const express = require('express');
const auth = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user }).sort({ date: -1 });
  res.json(transactions);
});

router.post('/', auth, async (req, res) => {
  const { description, amount, type } = req.body;
  const newTx = await Transaction.create({ userId: req.user, description, amount, type });
  res.status(201).json(newTx);
});

router.delete('/:id', auth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
