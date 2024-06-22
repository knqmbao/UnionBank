const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
