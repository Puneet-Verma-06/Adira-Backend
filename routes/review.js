const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getPropertyReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// Get all reviews for a property (public)
router.get('/property/:propertyId', getPropertyReviews);

// Create a review (authenticated users only)
router.post('/property/:propertyId', protect, createReview);

// Update a review (authenticated users only)
router.put('/:reviewId', protect, updateReview);

// Delete a review (authenticated users only)
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
