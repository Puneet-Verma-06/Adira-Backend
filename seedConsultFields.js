const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ConsultField = require('./models/ConsultField');

// Load environment variables
dotenv.config();

const seedConsultFields = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Check if the field already exists
    const existingField = await ConsultField.findOne({ name: 'Schedule a Tour (optional)' });
    
    if (existingField) {
      console.log('Default consult field already exists');
      process.exit(0);
      return;
    }

    // Create the default field
    const defaultField = new ConsultField({
      name: 'Schedule a Tour (optional)',
      fieldType: 'date',
      required: false,
      placeholder: 'Select a date for your tour',
      order: 1,
      active: true
    });

    await defaultField.save();
    console.log('✅ Default consult field created successfully');
    console.log('Field:', defaultField);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding consult fields:', error);
    process.exit(1);
  }
};

seedConsultFields();
