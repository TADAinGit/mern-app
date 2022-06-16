const mongoose = require('mongoose');

const phoneCardSchema = new mongoose.Schema(
    {
        hostId: {
            type: String,
            required: true
        },
        hostName: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const PhoneCard = mongoose.model('PhoneCard', phoneCardSchema);
module.exports = PhoneCard;