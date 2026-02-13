const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedPages = async () => {
  try {
    await connectDB();

    // Find an admin user to set as author
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Please create an admin user first.');
      process.exit(1);
    }

    // Sample pages data
    const samplePages = [
      {
        name: 'About Us',
        slug: 'about-us',
        description: 'Learn more about our company and mission',
        content: `Welcome to Sunshine Real Estate!

We are a leading real estate company dedicated to helping you find your dream property. With years of experience in the industry, we provide comprehensive services including property sales, rentals, and consultations.

Our Mission:
To provide exceptional service and help our clients make informed decisions about their real estate investments.

Why Choose Us:
- Expert team with local market knowledge
- Personalized service tailored to your needs
- Wide range of properties across various locations
- Trusted by thousands of satisfied clients

Contact us today to learn more about how we can help you!`,
        template: 'About Page',
        status: 'Published',
        metaTitle: 'About Us - Sunshine Real Estate',
        metaDescription: 'Learn about Sunshine Real Estate, your trusted partner in finding the perfect property.',
        metaKeywords: 'real estate, about us, property company, real estate services',
        author: adminUser._id,
        isHomePage: false
      },
      {
        name: 'Terms and Conditions',
        slug: 'terms-and-conditions',
        description: 'Terms and conditions for using our services',
        content: `Terms and Conditions

Last updated: ${new Date().toLocaleDateString()}

1. Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily download one copy of the materials on Sunshine Real Estate's website for personal, non-commercial transitory viewing only.

3. Disclaimer
The materials on Sunshine Real Estate's website are provided on an 'as is' basis. Sunshine Real Estate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall Sunshine Real Estate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sunshine Real Estate's website.

5. Privacy Policy
Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.

For questions about these Terms, please contact us.`,
        template: 'Default',
        status: 'Published',
        metaTitle: 'Terms and Conditions - Sunshine Real Estate',
        metaDescription: 'Read the terms and conditions for using Sunshine Real Estate services.',
        metaKeywords: 'terms, conditions, legal, policy',
        author: adminUser._id,
        isHomePage: false
      },
      {
        name: 'Privacy Policy',
        slug: 'privacy-policy',
        description: 'Our privacy policy and data protection practices',
        content: `Privacy Policy

Last updated: ${new Date().toLocaleDateString()}

At Sunshine Real Estate, we are committed to protecting your privacy and ensuring the security of your personal information.

Information We Collect:
- Personal identification information (Name, email address, phone number)
- Property preferences and search history
- Communication records

How We Use Your Information:
- To provide and improve our services
- To communicate with you about properties and services
- To send periodic emails and updates
- To improve customer service

Data Protection:
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Third-Party Disclosure:
We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.

Cookies:
Our website uses cookies to enhance user experience. You can choose to disable cookies through your browser settings.

Your Rights:
You have the right to access, update, or delete your personal information at any time.

Contact Us:
If you have questions about this Privacy Policy, please contact us at privacy@sunshinerealestate.com`,
        template: 'Default',
        status: 'Published',
        metaTitle: 'Privacy Policy - Sunshine Real Estate',
        metaDescription: 'Learn about our privacy practices and how we protect your data.',
        metaKeywords: 'privacy, policy, data protection, security',
        author: adminUser._id,
        isHomePage: false
      }
    ];

    // Clear existing pages (optional - remove if you want to keep existing pages)
    await Page.deleteMany({});
    console.log('Existing pages cleared');

    // Insert sample pages
    const createdPages = await Page.insertMany(samplePages);
    console.log(`${createdPages.length} sample pages created successfully!`);
    
    console.log('\nCreated pages:');
    createdPages.forEach(page => {
      console.log(`- ${page.name} (/${page.slug})`);
    });

    console.log('\nYou can now access these pages at:');
    createdPages.forEach(page => {
      console.log(`http://localhost:5173/${page.slug}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding pages:', error);
    process.exit(1);
  }
};

seedPages();
