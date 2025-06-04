const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require('../controllers/transactionController');

router.use(auth);

router.post('/', addTransaction);
router.get('/', getTransactions);
router.delete('/:id', deleteTransaction);

module.exports = router;
