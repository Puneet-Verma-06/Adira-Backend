const mongoose = require('mongoose');

const consultFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  fieldType: {
    type: String,
    enum: ['text', 'email', 'phone', 'date', 'textarea', 'number', 'select'],
    required: true,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  options: [{
    type: String
  }],
  placeholder: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
consultFieldSchema.index({ order: 1 });
consultFieldSchema.index({ active: 1 });

const ConsultField = mongoose.model('ConsultField', consultFieldSchema);

module.exports = ConsultField;
