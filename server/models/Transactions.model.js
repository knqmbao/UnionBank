const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer'],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
