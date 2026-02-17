const cloudinary = require('../config/cloudinary');

// Upload single image to Cloudinary
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Upload to Cloudinary from buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'property-images',
        resource_type: 'auto',
        transformation: [
          { width: 1920, height: 1080, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ 
            message: 'Error uploading image to Cloudinary',
            error: error.message 
          });
        }

        res.status(200).json({
          message: 'Image uploaded successfully',
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Server error during image upload',
      error: error.message 
    });
  }
};

// Upload multiple images to Cloudinary
exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'property-images',
            resource_type: 'auto',
            transformation: [
              { width: 1920, height: 1080, crop: 'limit' },
              { quality: 'auto:good' }
            ]
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                url: result.secure_url,
                publicId: result.public_id
              });
            }
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      message: 'Images uploaded successfully',
      images: results
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ 
      message: 'Server error during image upload',
      error: error.message 
    });
  }
};

// Delete image from Cloudinary
exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ message: 'No public ID provided' });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.status(200).json({ message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete image', result });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: 'Server error during image deletion',
      error: error.message 
    });
  }
};
