
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        externalId: {
            type: Number,
            unique: true,
            sparse: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
            default: '',
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            default: '',
        },
        website: {
            type: String,
            default: '',
        },
        company: {
            name: {
                type: String,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
