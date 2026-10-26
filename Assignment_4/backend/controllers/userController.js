
const User = require('../models/User');

// GET /api/users 
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: 1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Invalid user ID.' });
    }
};

// POST /api/users
const createUser = async (req, res) => {
    try {
        const { name, username, email, phone, website, company } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                message: 'Name and email are required.',
            });
        }

        const user = await User.create({
            name,
            username,
            email,
            phone,
            website,
            company: { name: company?.name || '' },
        });

        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'A user with this unique value already exists.',
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Failed to create user.' });
    }
};

// PUT /api/users/:id 
const updateUser = async (req, res) => {
    try {
        const { name, username, email, phone, website, company } = req.body;

        if (name !== undefined && !name.trim()) {
            return res.status(400).json({ message: 'Name cannot be empty.' });
        }

        if (email !== undefined && !email.trim()) {
            return res.status(400).json({ message: 'Email cannot be empty.' });
        }

        const updates = {};

        if (name !== undefined) updates.name = name;
        if (username !== undefined) updates.username = username;
        if (email !== undefined) updates.email = email;
        if (phone !== undefined) updates.phone = phone;
        if (website !== undefined) updates.website = website;
        if (company !== undefined) {
            updates.company = { name: company?.name || '' };
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'A user with this unique value already exists.',
            });
        }

        res.status(400).json({ message: 'Failed to update user.' });
    }
};

// DELETE /api/users/:id 
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            message: 'User deleted successfully.',
            user,
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid user ID.' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
