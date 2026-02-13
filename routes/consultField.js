const express = require('express');
const router = express.Router();
const consultFieldController = require('../controllers/consultFieldController');
const { protect } = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Public routes (for forms)
router.get('/active', consultFieldController.getActiveFields);

// Admin routes (require authentication and admin privileges)
router.get('/', protect, adminAuth, consultFieldController.getAllFields);
router.get('/:id', protect, adminAuth, consultFieldController.getFieldById);
router.post('/', protect, adminAuth, consultFieldController.createField);
router.put('/:id', protect, adminAuth, consultFieldController.updateField);
router.delete('/:id', protect, adminAuth, consultFieldController.deleteField);
router.put('/bulk/order', protect, adminAuth, consultFieldController.updateFieldsOrder);

module.exports = router;
