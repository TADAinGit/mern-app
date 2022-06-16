const moment = require("moment");
const CreditCard = require("../models/credit_card");
const jwt = require("jsonwebtoken");

const isLogin = async (req, res, next) => {
    const { username } = req.body;

    let userData = await User.findOne({ userName: username })

    if (!userData) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userData.accountRole === 'admin') {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: "Forbidden"
        });
    }
};

const isAdmin = async (req, res, next) => {

};

const verifyJWT = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(" ")[1]
    if (token == null) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: " + err
            });
        }
        next();
    });
};

const checkCreditCard = async (req, res, next) => {
    const { cardNumber, expiredDate, cvv, amount } = req.body;
    const card = await CreditCard.findOne({ cardNumber });
    if (card) {
        if (card.notification) {
            res.status(400).json({
                success: false,
                message: card.notification
            });
        }
        else if (expiredDate != moment(card.expiredDate).format('YYYY-MM-DD')) {
            res.status(400).json({
                success: false,
                message: 'Ngày hết hạn không hợp lệ'
            });
        }
        else if (cvv !== card.cvv) {
            res.status(400).json({
                success: false,
                message: 'Mã cvv không hợp lệ'
            });
        }
        else {
            next();
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Thẻ này không được hỗ trợ'
        });
    }
};

module.exports = {
    checkCreditCard,
    verifyJWT,
    isAdmin
}