const PhoneCard = require('../models/phone_card');
const Transaction = require("../models/transaction");
const Faker = require("@faker-js/faker");
const User = require("../models/user");

const payPhoneCard = async (req, res) => {
    const { hostName, cost, amount, username } = req.body;
    const userData = await User.findOne({ userName: username });

    if (!userData) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const price = cost * amount;
    let host = await PhoneCard.findOne({ hostName: hostName });

    let cards = []
    for (let i = 0; i < amount; i++) {
        cards.push("" + host.hostId + Faker.faker.random.numeric(5));
    }

    await User.findById(userData.id)
        .then(async user => {
            if (user.balance < price) {
                return res.status(400).json({
                    success: false,
                    message: 'Số tiền không đủ để thực hiện giao dịch'
                });
            }

            const transaction = new Transaction({
                from: 'payment system',
                to: userData.id,
                transactionType: 'payment',
                amount: price,
                transactionTime: Date.now(),
                transactionState: 'accepted',
                transactionFee: 0,
                transactionContent: 'Mua thẻ thành công. Danh sách thẻ:\n' + cards.map(card => card + "\n")
            });

            const result = await User.findByIdAndUpdate(userData.id, { $inc: { accountBalance: -price } })
                .then(async () => {
                    await transaction.save();
                    res.status(200).json({
                        success: true,
                        transaction: transaction
                    });
                })
                .catch(err => { console.log(err) });

        }).catch(err => { console.log(err) });
};

module.exports = payPhoneCard;