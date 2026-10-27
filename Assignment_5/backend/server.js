const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'https://angular-projects-mrt1.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/employees', require('./routes/employeeRoutes'));

mongoose.connect('mongodb+srv://sunilsahu21633:fFgKmo01YteyZsf4@secondbrain.alydi.mongodb.net/')
    .then(() => {
        console.log('Mongodb connected successfully');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        })
    })
    .catch(() => console.log('MongoDB connection failed'));