const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Routes
router.get('/', getWishlist);
router.post('/:propertyId', addToWishlist);
router.delete('/:propertyId', removeFromWishlist);
router.put('/:propertyId', toggleWishlist);

module.exports = router;
