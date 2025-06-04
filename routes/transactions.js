const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Get user data
router.get("/user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({
    email: user.email,
    currency: user.currency,
    transactions: user.transactions,
  });
});

// Update currency
router.put("/currency", authMiddleware, async (req, res) => {
  const { currency } = req.body;
  await User.findByIdAndUpdate(req.userId, { currency });
  res.json({ message: "Currency updated" });
});

// Add transaction
router.post("/add", authMiddleware, async (req, res) => {
  const { description, amount, type } = req.body;
  const user = await User.findById(req.userId);
  user.transactions.push({ description, amount, type });
  await user.save();
  res.json(user.transactions);
});

// Delete transaction
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  user.transactions.id(req.params.id).remove();
  await user.save();
  res.json(user.transactions);
});

module.exports = router;
