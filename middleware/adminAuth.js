const User = require('../models/User');

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    // Check if userId is set by auth middleware
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Get user from database
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    // User is admin, proceed to next middleware
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminAuth;
