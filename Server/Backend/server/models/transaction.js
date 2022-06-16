const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        from: {
            type: String,
        },
        to: {
            type: String
        },
        transactionType: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        transactionTime: {
            type: Date,
            required: true
        },
        transactionState: {
            type: String,
            required: true,
            enum: ['accepted', 'denied', 'waiting']
        },
        transactionFee: {
            type: Number,
            required: true
        },
        transactionContent: {
            type: String
        },
        transactionMessage: {
            type:String
        },
        transactionPayer: {
            type:String
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;




