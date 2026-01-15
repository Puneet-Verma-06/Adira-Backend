const User = require('../models/User');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('wishlist');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user.wishlist || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add property to wishlist
// @route   POST /api/wishlist/:propertyId
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.propertyId);
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if property already in wishlist
    if (user.wishlist.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property already in wishlist'
      });
    }

    // Add to wishlist
    user.wishlist.push(propertyId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Property added to wishlist',
      data: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Remove property from wishlist
// @route   DELETE /api/wishlist/:propertyId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.propertyId);
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Remove from wishlist
    user.wishlist = user.wishlist.filter(id => id !== propertyId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Property removed from wishlist',
      data: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Toggle property in wishlist
// @route   PUT /api/wishlist/:propertyId
// @access  Private
exports.toggleWishlist = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.propertyId);
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let message;
    if (user.wishlist.includes(propertyId)) {
      // Remove from wishlist
      user.wishlist = user.wishlist.filter(id => id !== propertyId);
      message = 'Property removed from wishlist';
    } else {
      // Add to wishlist
      user.wishlist.push(propertyId);
      message = 'Property added to wishlist';
    }

    await user.save();

    res.status(200).json({
      success: true,
      message,
      data: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
