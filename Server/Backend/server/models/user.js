const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        //unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        //unique: true,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    //Tên file CMND Mặt Trước
    frontCredentialFileName: {
        type: String,
        unique: true,
        required: true
    },
    //Tên file CMND Mặt Sau
    backCredentialFileName: {
        type: String,
        unique: true,
        required: true
    },
    //Content Type của CMND Mặt Trước
    frontCredentialContentType: {
        type: String,
        required: true
    },
    backCredentialContentType: {
        type: String,
        required: true
    },
    //Path của CMND Mặt Trước
    frontCredentialFilePath: {
        type: String,
        required: true
    },
    backCredentialFilePath: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
    },
    //Biến check người dùng đã login lần đầu vô hệ thống hay chưa
    firstLoginFlag: {
        type: Boolean
    },
    //Biến để admin duyệt trạng thái của người dùng sau khi đăng ký
    userStatus: {
        type: String,
        enum: ['active', 'lock', 'waiting', 'disable', 'updating'],
        default: 'waiting'
    },
    dateLock: {
        type: Date,
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    accountRole: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    //Biến đếm số lần đăng nhập sai
    // 3 lần sẽ lock - nếu có lần 4 sẽ khoá user
    loginFail: {
        type: Number
    },
    unusualLoginCount: {
        type: Number
    },

});

const User = mongoose.model('User', userSchema);
module.exports = User;