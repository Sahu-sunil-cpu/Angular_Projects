require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const employees = [
    { name: 'Rahul Sharma', department: 'Engineering', salary: 50000 },
    { name: 'Priya Verma', department: 'HR', salary: 35000 },
    { name: 'Amit Kumar', department: 'Design', salary: 40000 },
    { name: 'Neha Singh', department: 'Marketing', salary: 30000 },
    { name: 'Vikas Gupta', department: 'Engineering', salary: 60000 },
    { name: 'Anjali Patel', department: 'HR', salary: 32000 },
    { name: 'Rohit Mehta', department: 'Design', salary: 45000 },
    { name: 'Sneha Gupta', department: 'Marketing', salary: 38000 },
    { name: 'Karan Malhotra', department: 'Engineering', salary: 55000 },
    { name: 'Pooja Singh', department: 'HR', salary: 42000 }
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb+srv://sunilsahu21633:fFgKmo01YteyZsf4@secondbrain.alydi.mongodb.net/');

        // Remove existing records to avoid duplicates
        await Employee.deleteMany({});

        // Insert sample data
        await Employee.insertMany(employees);

        console.log('Sample employees inserted successfully');
    } catch (error) {
        console.error('Seeding failed:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();


