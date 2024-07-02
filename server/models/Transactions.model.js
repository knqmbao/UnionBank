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
        enum: ['deposit', 'withdrawal', 'transfer_debit', 'transfer_credit'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed',
    },
    balance: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: '',
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
