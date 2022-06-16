var nodemailer = require("nodemailer");
function sendEmailOTP(OTP, email) {
  // console.log(OTP);
  // var transporter = nodemailer.createTransport({
  //     service:'gmail',
  //     // host: "mail.phongdaotao.com",
  //     // port: 25,
  //     secure: false,
  //     auth: {
  //         user: 'sinhvien@phongdaotao.com',
  //         pass: 'svtdtu'
  //     }
  // });
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
    subject: "Mã OTP của bạn",
    text: `Mã OTP của bạn là: ${OTP}
        Tuyệt đối không được cung cấp mã OTP này cho bất kì ai`,
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
module.exports = sendEmailOTP;
