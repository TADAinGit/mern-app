const mongoose = require("mongoose");
const User = require("../models/user");
const emailValidator = require("email-validator");
const randomString = require("randomstring");
const sendEmail = require("../middleware/sendUserInfoEmail");
const sendEmailOTP = require("../middleware/OTP");
//const session = require('express-session');
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const res = require("express/lib/response");
const otplib = require("otplib");
const Transaction = require("../models/transaction");
const jwt = require("jsonwebtoken");

async function createUser(req, res, next) {
  //Tiếp nhận data từ form
  const files = req.files;
  const userEmail = req.body.email;
  const userPhone = req.body.phoneNumber;
  const userAddress = req.body.address;
  const userDateofBirth = req.body.dateOfBirth;
  const userFullName = req.body.fullName;

  //lấy ngày tạo tài khoản
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
  var date = year + "-" + month + "-" + day;

  //Kiểm tra các data tiếp nhận và ràng buộc nếu có
  if (!files) {
    const error = new Error("Vui lòng chọn đầy đủ file ảnh");
    error.httpStatusCode = 400;
    return next(error);
  } else if (files.imageCredentialBack[0].size > 5000000) {
    const error = new Error(
      "Kích thước ảnh CMND mặt sau quá lớn ! Vui lòng chọn ảnh có dung lượng dưới 5MB"
    );
    error.httpStatusCode = 400;
    return next(error);
  } else if (files.imageCredentialFront[0].size > 5000000) {
    const error = new Error(
      "Kích thước ảnh CMND mặt trước quá lớn ! Vui lòng chọn ảnh có dung lượng dưới 5MB"
    );
    error.httpStatusCode = 400;
    return next(error);
  } else if (!userEmail) {
    const error = new Error("Vui lòng nhập Email");
    error.httpStatusCode = 400;
    return next(error);
  } else if (!emailValidator.validate(userEmail)) {
    const error = new Error("Định dạng email không hợp lệ");
    error.httpStatusCode = 400;
    return next(error);
  } else if (!userPhone) {
    const error = new Error("Vui lòng nhập số điện thoại");
    error.httpStatusCode = 400;
    return next(error);
  } else if (!userAddress) {
    const error = new Error("Vui lòng nhập địa chỉ");
    error.httpStatusCode = 400;
    return next(error);
  } else if (!userDateofBirth) {
    const error = new Error("Vui lòng chọn ngày tháng năm sinh");
    error.httpStatusCode = 400;
    return next(error);
  } else if (!userFullName) {
    const error = new Error("Vui lòng nhập họ và tên");
    error.httpStatusCode = 400;
    return next(error);
  } else {
    //Create random username
    const userName = randomString.generate({
      length: 10,
      charset: "numeric",
    });

    //Create and Hash password for user
    const passWord = randomString.generate({
      length: 6,
    });

    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(passWord, salt);

    //Create user object to store in database
    let userInfo = {
      _id: mongoose.Types.ObjectId(),
      userName: userName,
      passWord: hashedPassword,
      fullName: userFullName,
      email: userEmail,
      phoneNumber: userPhone,
      address: userAddress,
      dateOfBirth: userDateofBirth,
      frontCredentialFileName: files.imageCredentialFront[0].filename,
      frontCredentialContentType: files.imageCredentialFront[0].mimetype,
      frontCredentialFilePath: files.imageCredentialFront[0].path,
      backCredentialFileName: files.imageCredentialBack[0].filename,
      backCredentialContentType: files.imageCredentialBack[0].mimetype,
      backCredentialFilePath: files.imageCredentialBack[0].path,
      dateCreate: date,
      firstLoginFlag: true,
      loginFail: 0,
      unusualLoginCount: 0,
    };

    let userUpload = new User(userInfo);
    return userUpload
      .save()
      .then((newUser) => {
        sendEmail(userName, passWord, userEmail);
        return res.status(201).json({
          success: true,
          message: "Tài khoản của người dùng được tạo thành công",
          User: newUser,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Tạo tài khoản thất bại ! Có lỗi xảy ra",
        });
      });
  }
}
async function loginUser(req, res) {
  User.findOne({ userName: req.body.userName }, async function (err, user) {
    if (user != null) {
      const validPassword = await bcrypt.compare(
        req.body.passWord,
        user.passWord
      );
      if (validPassword) {
        if (user.userStatus === "lock") {
          res.status(403).json({
            success: false,
            message: "your account are locked",
          });
        }
        //reset lần đăng nhập bất thường
        else {
          User.updateOne(
            { userName: req.body.userName },
            {
              $set: { unusualLoginCount: 0, loginFail: 0 },
            },
            function (err, res) {
              if (err) throw err;
            }
          );
          // req.session.cookie.expires = 900000
          // req.session.username = req.body.userName

          let accessToken = jwt.sign(
            { user: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "12h" }
          );

          let userData = {
            id: user._id,
            username: user.userName,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            firstLoginFlag: user.firstLoginFlag,
            userStatus: user.userStatus,
            accountRole: user.accountRole,
            withdrawTime: 2,
            accessToken: accessToken,
          };

          // req.session.user = userData;
          res.status(200).send({
            data: userData,
          });
          //session.cookie.expires = 60000
          //Note: còn phải xử lý userStatus đã được admin duyệt chưa, xử lý biến đăng nhập bất thường thì bị khóa 1p nếu đăng nhập sai
          // if (user.firstLoginFlag == false) {
          //     res.redirect("/firstLogin/:username",{username:req.body.userName})
          // } else {

          // }
        }
      } else {
        if (req.session.Lock1min) {
          res.status(403).send("please try again after 1 minute!");
        } else {
          User.updateOne(
            { userName: req.body.userName },
            {
              $set: { loginFail: user.loginFail + 1 },
            },
            function (err, res) {
              if (err) throw err;
            }
          );
          if (user.loginFail >= 2) {
            // Session will expires after 1 min
            // of in activity
            //console.log(123)
            if (user.unusualLoginCount >= 1) {
              //lấy thời gian hiện tại
              var date = new Date();
              User.updateOne(
                { userName: req.body.userName },
                {
                  $set: {
                    unusualLoginCount: user.unusualLoginCount + 1,
                    userStatus: "lock",
                    dateLock: date,
                  },
                },
                function (err, res) {
                  if (err) throw err;
                }
              );
              res.send({ success: false, message: "Locked" });
            } else {
              User.updateOne(
                { userName: req.body.userName },
                {
                  $set: { unusualLoginCount: user.unusualLoginCount + 1 },
                },
                function (err, res) {
                  if (err) throw err;
                }
              );
              //Set up session.
              if (req.session.Lock1min) {
                res
                  .status(401)
                  .json({
                    success: false,
                    message: "Please login again after 1 minute!!",
                  });
              } else {
                req.session.Lock1min = req.body.userName;
                res
                  .status(401)
                  .send({
                    success: false,
                    message: "Please login again after 1 minute!!",
                  });
              }
            }
          } else {
            res.send("login fail");
          }
        }
      }
      //Kiểm tra có userName không? nếu có sẽ set lần đăng nhập bất thường.
    } else {
      res.status(401).send("Login failed! Please check your account");
    }
  });
}

async function resetPassword(req, res) {
  const { password, email } = req.body;
  console.log(password, email);

  const salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(password, salt);
  User.updateOne(
    { email: email },
    {
      $set: { passWord: hashedPassword },
    },
    function (err, response) {
      if (err) {
        res.status(400).json({
          success: false,
          message: "Thay đổi mật khẩu người dùng thất bại !"
        })
      }
      else {
        res.status(200).json({
          success: true,
          message: "Người dùng thay đổi mật khẩu thành công !",
        });
      }
    }
  );
}

//Hàm xử lý trường hợp người dùng lần đầu tiên đăng nhập vào hệ thống thì phải đưa đến trang tạo MK mới
async function firstLogin(req, res) {
  const { passWord, repassWord, username } = req.body;
  if (checkUserLogin == 0) {
    res.render("register", { message: "Người dùng chưa đăng nhập" });
  } else {
    let user = await User.findOne({ userName: username });

    if (user.firstLoginFlag) {
      res.status(401).json({
        success: false,
        message: "Không hợp lệ",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      var hashedPassword = await bcrypt.hash(passWord, salt);
      User.updateOne(
        { userName: username },
        {
          $set: { passWord: hashedPassword, firstLoginFlag: true },
        },
        function (err, res) {
          if (err) throw err;
        }
      );

      let userData = {
        id: user._id,
        username: user.userName,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstLoginFlag: true,
        userStatus: user.userStatus,
        accountRole: user.accountRole,
      };

      res.status(200).json({
        success: true,
        data: userData,
        message: "Người dùng thay đổi mật khẩu thành công !",
      });
    }
  }
}

//Hàm kiểm tra xem người dùng đã đăng nhập vào hệ thống chưa
// Nhưng nó lại ko hoạt động :((((
function checkUserLogin() {
  console.log("check user login");
  if (!req.session.username) {
    return 0;
  } else {
    return 1;
  }
}

//Hàm hiển thị trang thông tin cá nhân của người dùng bao gồm: kiểm tra xem đã đăng nhập chưa, nếu đã đăng nhập thì:
// 1/Trạng thái người dùng là "chờ cập nhật" thì phải hiển thị cho người dùng tải lên lại ảnh CMND
// 2/ Nếu không thì hiển thị thông tin người dùng như thông thường
// 3/ Trạng thái waiting không xem được profile
function userProfile(req, res) {
  const { username } = req.body; // Gắn tạm mốt xóa
  if (checkUserLogin == 0) {
    res.render("register", { message: "Người dùng chưa đăng nhập" });
  } else {
    User.findOne({ userName: username }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        res.status(400).json({
          success: false,
          message: "Không tìm thấy người dùng !",
        });
      } else {
        if (user.userStatus == "updating") {
          // res.render('profile', { User: user, requiredReuploadCredential: true });
          res.status(200).json({
            success: true,
            requiredReuploadCredential: true,
            User: user,
          });
        } else {
          // res.render('profile', {
          //     User: user, fullName: user.fullName, address: user.address, email: user.email, userStatus: user.userStatus
          //     , phoneNumber: user.phoneNumber, accountBalance: user.accountBalance
          // });
          res.status(200).json({
            success: true,
            User: user,
          });
        }
      }
    });
  }
}

//Tại profile nếu trạng thái người dùng là "chờ cập nhật" thì phải upload lại 2 ảnh CMND, hàm này dùng để xử lý việc người dùng upload lại ảnh
function reUploadCredential(req, res, next) {
  const files = req.files;
  const username = req.body;
  if (!files) {
    const error = new Error("Vui lòng chọn đầy đủ file ảnh");
    error.httpStatusCode = 400;
    return next(error);
  } else {
    User.findOne({ userName: username }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        res.status(400).json({
          success: false,
          message: "Không tìm thấy người dùng !",
        });
      } else {
        User.updateOne(
          { userName: username },
          {
            $set: {
              frontCredentialFileName: files.imageCredentialFront[0].filename,
              frontCredentialContentType:
                files.imageCredentialFront[0].mimetype,
              frontCredentialFilePath: files.imageCredentialFront[0].path,
              backCredentialFileName: files.imageCredentialBack[0].filename,
              backCredentialContentType: files.imageCredentialBack[0].mimetype,
              backCredentialFilePath: files.imageCredentialBack[0].path,
            },
          },
          function (err, response) {
            if (err) throw err;
            else {
              res.status(200).json({
                success: true,
                message: "Cập nhật ảnh CMND của người dùng thành công !",
              });
            }
          }
        );
      }
    });
  }
}

async function changePassword(req, res) {
  const { newPassword, retypeNewPassword, currentPassword, username } =
    req.body;

  User.findOne({ userName: username }, async function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra, vui lòng thử lại sau",
      });
    }
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Không tìm thấy người dùng !",
      });
    } else {
      const validPassword = await bcrypt.compare(
        currentPassword,
        user.passWord
      );
      if (validPassword) {
        if (newPassword === retypeNewPassword) {
          const salt = await bcrypt.genSalt(10);
          var hashedPassword = await bcrypt.hash(newPassword, salt);
          User.updateOne(
            { userName: username },
            {
              $set: { passWord: hashedPassword },
            },
            function (err, response) {
              if (err) throw err;
              else {
                res.status(200).json({
                  success: true,
                  message: "Đổi mật khẩu thành công !",
                });
              }
            }
          );
        } else {
          res.status(400).json({
            success: false,
            message:
              "Thay đổi mật khẩu thất bại ! Mật khẩu mới nhập lại không khớp",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message:
            "Thay đổi mật khẩu thất bại ! Mật khẩu cũ không đúng vui lòng nhập lại ! ",
        });
      }
    }
  });
}
function getOTP(req, res) {
  //tạo OTP
  const { username, email } = req.body;
  console.log(username, email);
  otplib.totp.options = { step: 100 };
  console.log(otplib.totp.timeRemaining());
  var token = otplib.totp.generate("thisisSecretKey");
  User.findOne({ $or: [{ userName: username }, { email: email }] }, function (err, user) {
    if (err) {
      console.log(err);
    }
    else {
      sendEmailOTP(token, user.email);
      return res.status(200).json({
        success: true,
        message: "Gửi otp thành công"
      })
    }
  });
  // res.render('ValidateOTP')
}
function oTPValidate(req, res) {
  //check OTP
  if (otplib.totp.check(req.body.otp, "thisisSecretKey")) {
    res.status(200).json({
      success: true,
      message: "Xác thực otp thành công",
    });
  } else {
    res.status(400).json({
      success: true,
      message: "Xác thực thất bại, mã OTP không đúng",
    });
  }
}

async function showListHistory(req, res) {
  const { username } = req.body;

  let userData = await User.findOne({ userName: username });
  let histories = await Transaction.find({
    $or: [
      { from: userData._id },
      { to: userData._id, transactionState: "accepted" },
    ],
  }).sort({ transactionTime: "desc" });

  let data = [];
  histories.map((transaction) => {
    let obj = {
      id: transaction._id,
      from: transaction.from,
      to: transaction.to,
      transactionType: transaction.transactionType,
      amount: transaction.amount,
      transactionTime: transaction.transactionTime,
      transactionState: transaction.transactionState,
      transactionFee: transaction.transactionFee,
      transactionContent: transaction.transactionContent,
      transactionMessage: transaction.transactionMessage,
    };
    data.push(obj);
  });

  if (histories) {
    res.status(200).json({
      success: true,
      data: data,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra",
    });
  }
}

module.exports = {
  Create: createUser,
  Login: loginUser,
  firstLogin: firstLogin,
  Profile: userProfile,
  reUploadCredential: reUploadCredential,
  ChangePassword: changePassword,
  GetOTP: getOTP,
  OTPValidate: oTPValidate,
  ResetPassword: resetPassword,
  ShowListHistory: showListHistory,
};
