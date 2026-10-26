
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');

const importUsers = async () => {
    try {
        await connectDB();

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
            throw new Error(`JSONPlaceholder returned ${response.status}`);
        }

        const users = await response.json();

        let insertedCount = 0;

        for (const user of users) {
            const existingUser = await User.findOne({
                externalId: user.id,
            });

            if (existingUser) {
                continue;
            }

            await User.create({
                externalId: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                website: user.website,
                company: {
                    name: user.company?.name || '',
                },
            });

            insertedCount++;
        }

        console.log(`Fetched ${users.length} users.`);
        console.log(`Inserted ${insertedCount} new users.`);
        console.log('Import completed.');
    } catch (error) {
        console.error('Import failed:', error.message);
        process.exitCode = 1;
    } finally {
        const mongoose = require('mongoose');
        await mongoose.disconnect();
    }
};

importUsers();
