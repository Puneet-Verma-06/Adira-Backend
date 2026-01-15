const mongoose = require('mongoose');
const Property = require('./models/Property');
const User = require('./models/User');
require('dotenv').config();

const sampleProperties = [
  {
    title: "Modern Luxury Villa",
    description: "Beautiful 4-bedroom villa with swimming pool, garden, and stunning city views. Features modern architecture, spacious living areas, and premium finishes throughout.",
    propertyType: "residential",
    listingType: "sale",
    price: 1250000,
    location: {
      address: "123 Palm Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400001"
    },
    area: {
      value: 3500,
      unit: "sqft"
    },
    bedrooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    amenities: ["Swimming Pool", "Garden", "Parking", "Security", "Gym", "Balcony"],
    status: "available",
    isFeatured: true,
    ownerPhone: "+91-9876543210",
    ownerEmail: "owner1@example.com"
  },
  {
    title: "Cozy Downtown Apartment",
    description: "Perfect 2-bedroom apartment in the heart of the city. Close to shopping centers, restaurants, and public transportation. Ideal for young professionals.",
    propertyType: "residential",
    listingType: "rent",
    price: 35000,
    location: {
      address: "45 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560001"
    },
    area: {
      value: 1200,
      unit: "sqft"
    },
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    amenities: ["Parking", "Elevator", "24/7 Security", "Power Backup"],
    status: "available",
    isFeatured: false,
    ownerPhone: "+91-9876543211",
    ownerEmail: "owner2@example.com"
  },
  {
    title: "Commercial Office Space",
    description: "Prime commercial office space in business district. Perfect for startups and growing businesses. Comes with modern amenities and ample parking.",
    propertyType: "commercial",
    listingType: "rent",
    price: 150000,
    location: {
      address: "Tower A, Cyber City",
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipCode: "122002"
    },
    area: {
      value: 5000,
      unit: "sqft"
    },
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
    ],
    amenities: ["Central AC", "Parking", "Conference Room", "Cafeteria", "High-Speed Internet"],
    status: "available",
    isFeatured: true,
    ownerPhone: "+91-9876543212",
    ownerEmail: "owner3@example.com"
  },
  {
    title: "Spacious Family Home",
    description: "Charming 3-bedroom family home in a quiet neighborhood. Large backyard, modern kitchen, and close to schools and parks.",
    propertyType: "residential",
    listingType: "sale",
    price: 7500000,
    location: {
      address: "78 Green Valley",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      zipCode: "411001"
    },
    area: {
      value: 2500,
      unit: "sqft"
    },
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
    ],
    amenities: ["Garden", "Parking", "Security", "Kids Play Area"],
    status: "available",
    isFeatured: false,
    ownerPhone: "+91-9876543213",
    ownerEmail: "owner4@example.com"
  },
  {
    title: "Premium Penthouse Suite",
    description: "Luxurious penthouse with panoramic views of the city skyline. Features high-end finishes, private terrace, and exclusive amenities.",
    propertyType: "residential",
    listingType: "sale",
    price: 25000000,
    location: {
      address: "Sky Tower, Worli",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400018"
    },
    area: {
      value: 4500,
      unit: "sqft"
    },
    bedrooms: 5,
    bathrooms: 4,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"
    ],
    amenities: ["Private Pool", "Terrace", "Gym", "Home Theater", "Smart Home", "Concierge Service"],
    status: "available",
    isFeatured: true,
    ownerPhone: "+91-9876543214",
    ownerEmail: "owner5@example.com"
  },
  {
    title: "Agricultural Land",
    description: "10 acres of fertile agricultural land with water access. Perfect for farming or investment purposes.",
    propertyType: "land",
    listingType: "sale",
    price: 5000000,
    location: {
      address: "Village Road",
      city: "Nashik",
      state: "Maharashtra",
      country: "India",
      zipCode: "422001"
    },
    area: {
      value: 10,
      unit: "acres"
    },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
    ],
    amenities: ["Water Supply", "Road Access", "Electricity"],
    status: "available",
    isFeatured: false,
    ownerPhone: "+91-9876543215",
    ownerEmail: "owner6@example.com"
  },
  {
    title: "Luxury Apartment Project",
    description: "New residential project featuring luxury apartments with world-class amenities. Pre-launch offers available.",
    propertyType: "project",
    listingType: "sale",
    price: 8500000,
    location: {
      address: "Electronic City Phase 2",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560100"
    },
    area: {
      value: 2800,
      unit: "sqft"
    },
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800"
    ],
    amenities: ["Swimming Pool", "Clubhouse", "Gym", "Kids Play Area", "Landscaped Gardens", "Security"],
    status: "available",
    isFeatured: true,
    ownerPhone: "+91-9876543216",
    ownerEmail: "owner7@example.com"
  },
  {
    title: "Budget-Friendly Studio",
    description: "Compact and efficient studio apartment perfect for students or young professionals. Fully furnished and ready to move in.",
    propertyType: "residential",
    listingType: "rent",
    price: 15000,
    location: {
      address: "12 College Road",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110001"
    },
    area: {
      value: 450,
      unit: "sqft"
    },
    bedrooms: 1,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"
    ],
    amenities: ["Furnished", "Wi-Fi", "Power Backup"],
    status: "available",
    isFeatured: false,
    ownerPhone: "+91-9876543217",
    ownerEmail: "owner8@example.com"
  }
];

// Create a default admin user for testing
const createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@property.com' });
    
    if (existingUser) {
      console.log('Default user already exists');
      return existingUser;
    }

    const user = await User.create({
      name: 'Admin User',
      email: 'admin@property.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Default admin user created successfully');
    console.log('Email: admin@property.com');
    console.log('Password: admin123');
    return user;
  } catch (error) {
    console.error('Error creating default user:', error);
    throw error;
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-listing', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Create default user
    const defaultUser = await createDefaultUser();

    // Clear existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Add postedBy field to all properties
    const propertiesWithUser = sampleProperties.map(property => ({
      ...property,
      postedBy: defaultUser._id
    }));

    // Insert sample properties
    const properties = await Property.insertMany(propertiesWithUser);
    console.log(`Successfully added ${properties.length} sample properties`);

    console.log('\n=== Sample Data Summary ===');
    console.log(`Total Properties: ${properties.length}`);
    console.log(`Featured Properties: ${properties.filter(p => p.isFeatured).length}`);
    console.log(`For Sale: ${properties.filter(p => p.listingType === 'sale').length}`);
    console.log(`For Rent: ${properties.filter(p => p.listingType === 'rent').length}`);
    
    console.log('\n=== Property Types ===');
    const types = properties.reduce((acc, p) => {
      acc[p.propertyType] = (acc[p.propertyType] || 0) + 1;
      return acc;
    }, {});
    Object.entries(types).forEach(([type, count]) => {
      console.log(`${type}: ${count}`);
    });

    mongoose.connection.close();
    console.log('\nDatabase seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
