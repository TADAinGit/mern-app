const mongoose = require('mongoose');
const User = require('../models/user');
const CreditCard = require('../models/credit_card');
const Transaction = require('../models/transaction');
const sendMail = require('../middleware/receiveMail');
const otplib = require("otplib");

// Need some authorize middle-wares
// Validate data
// Save transaction to database

const balanceDeposit = async (req, res) => {
    const { cardNumber, expiredDate, cvv, amount, username } = req.body;

    let userData = await User.findOne({ userName: username })

    if (!userData) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const transaction = new Transaction({
        from: 'deposit system',
        to: userData._id,
        transactionType: 'deposit',
        amount: amount,
        transactionTime: Date.now(),
        transactionState: 'accepted',
        transactionFee: 0,
        transactionMessage: 'Nạp tiền thành công'
    });

    const result = await User.findByIdAndUpdate(userData._id, { $inc: { accountBalance: amount } })
        .then(async () => {
            await transaction.save()
        })
        .catch(err => { console.log(err) });


    return res.status(200).json({ success: true, transaction });
};

const balanceWithdraw = async (req, res) => {
    const { cardNumber, expiredDate, cvv, amount, username } = req.body;
    

    let userData = await User.findOne({ userName: username })

    if (!userData) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

   
    await User.findById(userData._id)
        .then(async user => {
            let transaction = {};
            let result = {};

            let transactionFee = amount * 5 / 100;

            if (user.accountBalance > amount + transactionFee) {
                // Kiểm tra bội số của 50.000VND
                if (amount % 50000 !== 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Số tiền rút phải là bội số của 50.000VND'
                    });
                }

                // Kiểm tra số tiền rút lớn hơn 5.000.000VND
                if (amount > 5000000) {
                    let transactionData = {
                        from: 'withdraw system',
                        to: userData._id,
                        transactionType: 'withdraw',
                        amount: amount,
                        transactionTime: Date.now(),
                        transactionState: 'waiting',
                        transactionFee: transactionFee,
                        transactionMessage: 'Số tiền lớn hơn 5.000.000VND vui lòng chờ duyệt'
                    };
                    transaction = await new Transaction(transactionData).save()
                }
                else {
                    let transactionData = {
                        from: 'withdraw system',
                        to: userData._id,
                        transactionType: 'withdraw',
                        amount: amount,
                        transactionTime: Date.now(),
                        transactionState: 'accepted',
                        transactionFee: transactionFee,
                        transactionMessage: 'Rút tiền thành công'
                    };

                    result = await User.findByIdAndUpdate(userData._id, { $inc: { accountBalance: -(amount + transactionFee) } })
                        .then(async () => {
                            transaction = await new Transaction(transactionData).save()

                        })
                        .catch(err => { console.log(err) });
                }

                // req.session.user.withdrawTime -= 1; // Trừ số lần rút trong 1 ngày

                return res.status(200).json({
                    success: true,
                    transaction: transaction
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Tài khoản của bạn không đủ để thực hiện giao dịch'
                });
            }
        }).catch(err => {
            console.log("Error:", err);
        });
};

const balanceTransfer = async (req, res) => {
    const { receiver, amount, content, username, payer} = req.body;
    console.log(req.body.otp);
    if (!otplib.totp.check(req.body.otp, "thisisSecretKey")) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }

    let userData = await User.findOne({ userName: username })

    if (!userData) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    await User.findById(userData._id)
        .then(async user => {
            let transactionData = {};
            let result = {};


            let toUser = await User.findOne({ phoneNumber: receiver });
            console.log(toUser);
            if (user.accountBalance > amount /*&& user.balance >= 50000*/) {
                let transactionFee = amount * 5 / 100;

                // Kiểm tra số tiền rút lớn hơn 5.000.000VND
                if (amount > 5000000) {
                    transactionData = {
                        from: user._id,
                        to: toUser._id,
                        transactionType: 'transfer',
                        amount: amount,
                        transactionTime: Date.now(),
                        transactionState: 'waiting',
                        transactionFee: transactionFee,
                        transactionContent: content,
                        transactionMessage: 'Số tiền lớn hơn 5.000.000VND vui lòng chờ duyệt',
                        transactionPayer: payer
                    };
                    await new Transaction(transactionData).save()
                }
                else {
                    transactionData = {
                        from: user._id,
                        to: toUser._id,
                        transactionType: 'transfer',
                        amount: amount,
                        transactionTime: Date.now(),
                        transactionState: 'accepted',
                        transactionFee: transactionFee,
                        transactionContent: content,
                        transactionPayer: payer
                    };
                    let senderFee = payer == user.phoneNumber
                    result = await User.findByIdAndUpdate(userData._id, { $inc: { accountBalance: senderFee ? -(amount + transactionFee) : -amount } })
                        .then(async () => {
                            await User.findByIdAndUpdate(toUser._id, { $inc: { accountBalance: senderFee ? amount : (amount - transactionFee) } });
                            await new Transaction(transactionData).save();
                            sendMail(amount, toUser.email, content, userData.fullName);
                        })
                        .catch(err => { console.log(err) });
                }

                return res.status(200).json({
                    success: true,
                    transaction: transactionData
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Tài khoản của bạn không đủ để thực hiện giao dịch'
                });
            }
        }).catch(err => {
            console.log("Error:", err);
        });
};

module.exports = {
    balanceDeposit,
    balanceWithdraw,
    balanceTransfer
}