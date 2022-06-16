const express = require("express");
const Controller = require("../controllers/user");
const AdminController = require("../controllers/admin");
const multer = require("multer");
const OTP = require("../middleware/OTP");
const storage = require("../middleware/multer");
const routes = express.Router();
const session = require("express-session");
const { resolveContent } = require("nodemailer/lib/shared");
const api = require("../api/api");
const { verifyJWT } = require("../middleware/checker");

//Khai báo hàm upload ảnh CMND của người dùng
var upload = multer({ storage: storage });
var multipleUpload = upload.fields([
  { name: "imageCredentialFront", maxCount: 1 },
  { name: "imageCredentialBack", maxCount: 1 },
]);

//Routes đăng nhập, đăng ký của người dùng
routes.post("/register", multipleUpload, Controller.Create);
routes.post("/login", Controller.Login);
routes.get("/login", (req, res) => {
  res.render("register");
});
routes.get("/firstLogin/:username", (req, res) => {
  res.render("firstLogin", { Username: req.params.username });
});
routes.post("/firstlogin", Controller.firstLogin);

//Routes chức năng của người dùng
routes.post("/profile", verifyJWT, Controller.Profile);
routes.post(
  "/profile/reUploadCredential",
  multipleUpload,
  Controller.reUploadCredential
);

routes.get("/changePassword", (req, res) => {
  res.render("changePass");
});

routes.post("/changePassword", verifyJWT, Controller.ChangePassword);

routes.get("/home", (req, res) => {
  res.render("home");
});
routes.post("/sendOTP", Controller.GetOTP);
routes.post("/OTPValidate", Controller.OTPValidate);

routes.get("/resetPassword", (req, res) => {
  res.render("resetPassword");
});

routes.post("/history", verifyJWT, Controller.ShowListHistory);

// Các tác vụ về balance
routes.use("/api", api);

routes.post("/resetPassword", Controller.ResetPassword);
module.exports = routes;
