const mongoose = require("mongoose");
const User = require("../models/user");
const req = require("express/lib/request");
const Transaction = require("../models/transaction");

//Lấy toàn bộ danh sách user
async function getListUser(req, res) {
  let users = await User.find({}); //, function (err, users) {
  let data = [];
  users.map((user) => {
    let obj = {
      id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      userStatus: user.userStatus,
      accountBalance: user.accountBalance,
      accountRole: user.accountRole,
    };
    data.push(obj);
  });
  //})
  return res.status(200).json({
    success: true,
    users: data,
  });
}

// Lấy toàn bộ giao dịch
async function getListTransaction(req, res) {
  let transactions = await Transaction.find({}).sort({
    transactionTime: "desc",
  });
  let data = [];
  transactions.map((transaction) => {
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
  return res.status(200).json({
    success: true,
    transactions: data,
  });
}
//Lấy danh sách user đợi active
function getListUserUnactive(req, res) {
  User.find({ userStatus: "waiting" }, function (err, users) {
    return res.status(200).json({
      success: true,
      Users: users,
    });
  }).sort({ dateCreate: "desc", frontCredentialFileName: "desc" });
}
//Lấy danh sách user đã bị vô hiệu hoá
function getListUserDisable(req, res) {
  User.find({ userStatus: "disable" }, function (err, users) {
    return res.status(200).json({
      success: true,
      Users: users,
    });
  }).sort({ dateCreate: "desc" });
}

//Lấy danh sách user active thành công
function getListUserActived(req, res) {
  User.find({ userStatus: "active" }, function (err, users) {
    return res.status(200).json({
      success: true,
      Users: users,
    });
  }).sort({ dateCreate: "desc" });
}
//Lấy danh sách user khoá vô thời hạn
function getListUserLocked(req, res) {
  User.find({ userStatus: "lock" }, function (err, users) {
    return res.status(200).json({
      success: true,
      Users: users,
    });
  }).sort({ dateLock: 1 });
}

//lấy thông tin tài khoản ./admin/profile/username
async function getProfile(req, res) {
  let getLastday = function (y, m) {
    return new Date(y, m + 1, 0).getDate();
  };
  let date = new Date();
  let firstday = new Date("" + (new Date().getMonth() + 1) + "/01/2022");
  let lastday = new Date(
    date.getMonth() +
      1 +
      "/" +
      getLastday(date.getFullYear(), date.getMonth()) +
      "/" +
      date.getFullYear()
  );

  User.findOne({ userName: req.params.username }, async function (err, user) {
    console.log(user);
    if (user.userStatus === "active") {
      let history = await Transaction.find({
        $and: [
          {
            $or: [{ from: user._id }, { to: user._id }],
          },
          {
            transactionTime: { $gte: firstday, $lte: lastday },
          },
        ],
      }).sort({ transactionTime: "desc" });

      return res.status(200).json({
        success: true,
        user: user,
        history,
      });
    }
  });
}

// Thay đổi trạng thái người dùng
async function setUserStatus(req, res) {
  try {
    await User.updateOne(
      { userName: req.body.username },
      {
        $set: { userStatus: req.body.status },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
}

//xác thực tài khoản với đường dẫn ./admin/verification/username
async function verification(req, res) {
  try {
    await User.updateOne(
      { userName: req.params.username },
      {
        $set: { userStatus: "active" },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
}

//Huỷ xác thực tài khoản với đường dẫn ./admin/unVerification/username
async function unVerification(req, res) {
  try {
    await User.updateOne(
      { userName: req.params.username },
      {
        $set: { userStatus: "disable" },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
}

//Yêu cầu bổ sung thông tin .admin/additionalRequest/username
async function additionalRequest(req, res) {
  try {
    await User.updateOne(
      { userName: req.params.username },
      {
        $set: { userStatus: "updating" },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
}

//Xem danh sách các giao dịch >5tr đang chờ admin duyệt
function waitingTransactionList(req, res) {
  Transaction.find(
    { transactionState: "waiting" },
    function (err, transactionList) {
      if (err) {
        return res.status(401).json({
          success: false,
          message:
            "Có lỗi xảy ra, lấy danh sách giao dịch đang chờ phê duyệt thất bại",
        });
      } else {
        return res.status(201).json({
          success: true,
          message:
            "Lấy danh sách các giao dịch đang chờ được phê duyệt thành công",
          data: transactionList,
        });
      }
    }
  );
}

//Phê duyệt giao dịch đang chờ duyệt
async function approveTransaction(req, res) {
  const { transactionID } = req.body;
  console.log(transactionID);
  Transaction.findByIdAndUpdate(
    transactionID,
    {
      $set: { transactionState: "accepted" },
    },
    async function (err, trans) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Có lỗi xảy ra, phê duyệt giao dịch thất bại",
        });
      } else {
        if (trans.transactionType === "transfer") {
          User.findById(trans.from)
            .then(async (user) => {
              if (user.accountBalance > trans.amount) {
                let senderFee = trans.transactionPayer == user.phoneNumber;
                result = await User.findByIdAndUpdate(trans.from, {
                  $inc: {
                    accountBalance: senderFee
                      ? -(trans.amount + trans.transactionFee)
                      : -trans.amount,
                  },
                })
                  .then(async () => {
                    await User.findByIdAndUpdate(trans.to, {
                      $inc: {
                        accountBalance: senderFee
                          ? trans.amount
                          : trans.amount - trans.transactionFee,
                      },
                    });
                    return res.status(200).json({
                      success: true,
                      message:
                        "Giao dịch chuyển tiền đã được phê duyệt thành công",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                Transaction.findByIdAndUpdate(
                  transactionID,
                  {
                    $set: { transactionState: "denied" },
                  },
                  function (err, response) {
                    if (err) {
                      return res.status(401).json({
                        success: false,
                        message: "Có lỗi xảy ra, phê duyệt giao dịch thất bại",
                      });
                    } else {
                      return res.status(201).json({
                        success: false,
                        message:
                          "Phê duyệt giao dịch thất bại, số dư tài khoản hiện tại thấp hơn số tiền giao dịch",
                      });
                    }
                  }
                );
              }
            })
            .catch((err) => {
              console.log("Error: ", err);
            });
        }
        if (trans.transactionType === "withdraw") {
          User.findById(trans.to)
            .then(async (user) => {
              if (user.accountBalance > trans.amount) {
                console.log("Reached first if");
                result = await User.findByIdAndUpdate(trans.to, {
                  $inc: {
                    accountBalance: -(trans.amount + trans.transactionFee),
                  },
                })
                  .then(() => {
                    return res.status(200).json({
                      success: true,
                      message:
                        "Giao dịch rút tiền đã được phê duyệt thành công",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                console.log("Reached seccond if");
                return res.status(201).json({
                  success: false,
                  message:
                    "Phê duyệt giao dịch thất bại, số dư tài khoản hiện tại thấp hơn số tiền giao dịch",
                });
              }
            })
            .catch((err) => {
              console.log("Error: ", err);
            });
        }
      }
    }
  );
}

async function deniedTransaction(req, res) {
  const { transactionID } = req.body;
  await Transaction.findByIdAndUpdate(
    transactionID,
    {
      $set: { transactionState: "denied" },
    },
    function (err, trans) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Có lỗi xảy ra, phê duyệt giao dịch thất bại",
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Từ chối giao dịch thành công",
        });
      }
    }
  );
}

module.exports = {
  getList: getListUser,
  Unactived: getListUserUnactive,
  Locked: getListUserLocked,
  Actived: getListUserActived,
  Disable: getListUserDisable,
  Profile: getProfile,
  Verification: verification,
  unVerification: unVerification,
  additionalRequest: additionalRequest,
  waitingTransactionList: waitingTransactionList,
  Approve: approveTransaction,
  Denied: deniedTransaction,
  Status: setUserStatus,
  getTransactions: getListTransaction,
};
