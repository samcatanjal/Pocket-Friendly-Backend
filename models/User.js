const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: { type: String, enum: ["income", "expense"] },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currency: { type: String, default: "$" },
  transactions: [transactionSchema],
});

module.exports = mongoose.model("User", userSchema);
