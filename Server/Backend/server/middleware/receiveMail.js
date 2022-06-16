var nodemailer = require("nodemailer");
function emailReceive(amount, email, content, sender) {
  
  /*var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "mail.phongdaotao.com",
    port: 25,
    secure: false,
    auth: {
      user: "sinhvien@phongdaotao.com",
      pass: "svtdtu",
    },
  });*/

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "appshoppingtad@gmail.com",
      pass: "hoangdat285",
    },
  });

  var mailOptions = {
    from: "ABCXYZ@company.com",
    to: `${email}`,
    subject: "Thông báo nhận tiền từ METAMASK",
    text: `Bạn vừa nhận số tiền : ${amount} từ người gửi ${sender} với nội dung:\n${content}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email đã được gửi thành công" + info.response);
    }
  });
}
//sendEmailOTP("2121321","phamthanhluan9c@gmail.com")
module.exports = emailReceive;
