const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        unique: true,
        required: true,
    },
    accountType: {
        type: String,
        enum: ['savings', 'checking'],
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    isactive: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
