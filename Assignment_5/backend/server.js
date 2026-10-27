const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4200'
}));

app.use(express.json());

app.use('/api/employees', require('./routes/employeeRoutes'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongodb connected successfully');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        })
    })
    .catch(() => console.log('MongoDB connection failed'));