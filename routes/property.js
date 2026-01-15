const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const propertyController = require('../controllers/propertyController');

// Public routes
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

// Protected routes (require authentication)
router.post('/', protect, propertyController.createProperty);
router.get('/user/my-properties', protect, propertyController.getMyProperties);
router.put('/:id', protect, propertyController.updateProperty);
router.delete('/:id', protect, propertyController.deleteProperty);
router.get('/:id/contact', protect, propertyController.getOwnerContact);

module.exports = router;
