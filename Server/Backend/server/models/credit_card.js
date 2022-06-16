const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema(
    {
        cardNumber: {
            type: String,
            required: true
        },
        expiredDate: {
            type: Date,
            required: true
        },
        cvv: {
            type: String,
            required: true
        },
        limitation: {
            type: Number
        },
        notification: {
            type: String
        }
    },
    { timestamps: true }
);

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = CreditCard;
