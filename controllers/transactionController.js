const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const transaction = await Transaction.create({
      user: req.userId,
      description,
      amount,
      type,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.userId }).sort({ date: -1 });
  res.json(transactions);
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findOneAndDelete({ _id: id, user: req.userId });
  res.json({ message: 'Transaction deleted' });
};
