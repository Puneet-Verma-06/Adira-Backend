const ConsultField = require('../models/ConsultField');

// Get all custom fields
exports.getAllFields = async (req, res) => {
  try {
    const fields = await ConsultField.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      fields
    });
  } catch (error) {
    console.error('Error fetching custom fields:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching custom fields',
      error: error.message
    });
  }
};

// Get active custom fields (for public forms)
exports.getActiveFields = async (req, res) => {
  try {
    const fields = await ConsultField.find({ active: true })
      .sort({ order: 1 })
      .lean();

    res.json({
      success: true,
      fields
    });
  } catch (error) {
    console.error('Error fetching active custom fields:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active custom fields',
      error: error.message
    });
  }
};

// Get single field by ID
exports.getFieldById = async (req, res) => {
  try {
    const field = await ConsultField.findById(req.params.id);

    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Custom field not found'
      });
    }

    res.json({
      success: true,
      field
    });
  } catch (error) {
    console.error('Error fetching custom field:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching custom field',
      error: error.message
    });
  }
};

// Create new custom field (Admin only)
exports.createField = async (req, res) => {
  try {
    const { name, fieldType, required, options, placeholder, order, active } = req.body;

    const field = new ConsultField({
      name,
      fieldType,
      required,
      options,
      placeholder,
      order,
      active
    });

    await field.save();

    res.status(201).json({
      success: true,
      message: 'Custom field created successfully',
      field
    });
  } catch (error) {
    console.error('Error creating custom field:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating custom field',
      error: error.message
    });
  }
};

// Update custom field (Admin only)
exports.updateField = async (req, res) => {
  try {
    const fieldId = req.params.id;
    const updates = req.body;

    const field = await ConsultField.findByIdAndUpdate(
      fieldId,
      updates,
      { new: true, runValidators: true }
    );

    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Custom field not found'
      });
    }

    res.json({
      success: true,
      message: 'Custom field updated successfully',
      field
    });
  } catch (error) {
    console.error('Error updating custom field:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating custom field',
      error: error.message
    });
  }
};

// Delete custom field (Admin only)
exports.deleteField = async (req, res) => {
  try {
    const fieldId = req.params.id;

    const field = await ConsultField.findByIdAndDelete(fieldId);

    if (!field) {
      return res.status(404).json({
        success: false,
        message: 'Custom field not found'
      });
    }

    res.json({
      success: true,
      message: 'Custom field deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting custom field:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting custom field',
      error: error.message
    });
  }
};

// Bulk update field order (Admin only)
exports.updateFieldsOrder = async (req, res) => {
  try {
    const { fields } = req.body; // Array of { id, order }

    const updatePromises = fields.map(({ id, order }) =>
      ConsultField.findByIdAndUpdate(id, { order })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Field order updated successfully'
    });
  } catch (error) {
    console.error('Error updating field order:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating field order',
      error: error.message
    });
  }
};
