const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    // Clear existing users (optional - remove if you want to keep existing data)
    // await User.deleteMany({});

    // Create demo users
    const demoUsers = [
      {
        name: 'Admin User',
        email: 'admin@company.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'user@company.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@company.com',
        password: 'password123',
        role: 'user',
      },
    ];

    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`Created user: ${userData.email} (${userData.role})`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log('\nDatabase seeding completed!');
    console.log('\nDemo Credentials:');
    console.log('─'.repeat(40));
    console.log('Admin Account:');
    console.log('  Email: admin@company.com');
    console.log('  Password: password123');
    console.log('\nRegular User Accounts:');
    console.log('  Email: user@company.com');
    console.log('  Password: password123');
    console.log('\n  Email: jane@company.com');
    console.log('  Password: password123');
    console.log('─'.repeat(40));

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
