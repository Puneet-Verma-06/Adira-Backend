const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const pageController = require('../controllers/pageController');

// Public routes (for frontend to fetch published pages)
router.get('/published', pageController.getPublishedPages);
router.get('/slug/:slug', pageController.getPageBySlug);

// Protected routes (require authentication)
router.get('/', protect, adminAuth, pageController.getAllPages);
router.get('/:id', protect, adminAuth, pageController.getPageById);
router.post('/', protect, adminAuth, pageController.createPage);
router.put('/:id', protect, adminAuth, pageController.updatePage);
router.put('/:id/status', protect, adminAuth, pageController.updatePageStatus);
router.delete('/:id', protect, adminAuth, pageController.deletePage);
router.post('/bulk-delete', protect, adminAuth, pageController.bulkDeletePages);

module.exports = router;
