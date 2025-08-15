const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/poonam-ladies-wear');
        console.log('✅ Connected to MongoDB');

        // Check if users exist
        const userCount = await User.countDocuments({});
        console.log(`📊 Total users in database: ${userCount}`);

        if (userCount === 0) {
            console.log('⚠️  No users found in database. You need to register first!');
        } else {
            console.log('✅ Database has users. Checking sample user...');

            // Check a sample user
            const sampleUser = await User.findOne({});
            console.log('Sample user:', {
                id: sampleUser._id,
                firstName: sampleUser.firstName,
                lastName: sampleUser.lastName,
                email: sampleUser.email,
                hasPassword: !!sampleUser.password,
                passwordLength: sampleUser.password ? sampleUser.password.length : 0
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

checkUsers();
