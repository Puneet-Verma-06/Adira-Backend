const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit per file
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Protected routes (require authentication)
router.post('/single', protect, upload.single('image'), uploadController.uploadImage);
router.post('/multiple', protect, upload.array('images', 10), uploadController.uploadMultipleImages);
router.delete('/delete', protect, uploadController.deleteImage);

module.exports = router;
