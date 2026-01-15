const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['residential', 'commercial', 'land', 'project']
  },
  listingType: {
    type: String,
    required: true,
    enum: ['sale', 'rent'],
    default: 'sale'
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  area: {
    value: Number,
    unit: {
      type: String,
      enum: ['sqft', 'sqm', 'acres']
    }
  },
  bedrooms: Number,
  bathrooms: Number,
  images: [String],
  amenities: [String],
  status: {
    type: String,
    enum: ['available', 'sold', 'rented', 'under-contract'],
    default: 'available'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  // Owner contact information (private - not displayed publicly)
  ownerPhone: {
    type: String,
    required: true
  },
  ownerEmail: {
    type: String,
    required: true
  },
  // Reference to the user who posted this property
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema);
