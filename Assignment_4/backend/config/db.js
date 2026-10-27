
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb+srv://sunilsahu21633:fFgKmo01YteyZsf4@secondbrain.alydi.mongodb.net/'
        );

        console.log(
            `connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error('connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
