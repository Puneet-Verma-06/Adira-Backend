const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getPropertyReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// Get all reviews for a property (public)
router.get('/property/:propertyId', getPropertyReviews);

// Create a review (authenticated users only)
router.post('/property/:propertyId', auth, createReview);

// Update a review (authenticated users only)
router.put('/:reviewId', auth, updateReview);

// Delete a review (authenticated users only)
router.delete('/:reviewId', auth, deleteReview);

module.exports = router;
