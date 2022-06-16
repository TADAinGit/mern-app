const express = require('express');
const Controller = require('../controllers/user')
const AdminController = require('../controllers/admin')
const routes = express.Router();


//lấy danh sách user
routes.get('/list', AdminController.getList)

//lấy danh sách user đã active "đã xác minh"
routes.get('/actived', AdminController.Actived)

//lấy danh sách user chưa active "chờ xác minh"
routes.get('/unactived', AdminController.Unactived)

//lấy danh sách user đã bị khoá "lock"
// lock do đăng nhập sai
routes.get('/locked', AdminController.Locked)

//lấy danh sách user đã bị khoá "bị vô hiệu hoá"
//lock do thông tin có điều bất thường
routes.get('/disable', AdminController.Disable)

//lấy thông tin user ở trang admin
routes.get('/profile/:username', AdminController.Profile)

//admin xác minh tài khoản -> tk về trạng thái "đã xác minh"
routes.get('/verification/:username', AdminController.Verification)

//admin huỷ xác minh tài khoản -> tk về trạng thái "đã vô hiệu hoá"
routes.get('/unVerification/:username', AdminController.unVerification)

//admin yêu cầu thêm thông tin cmnd -> tk về trạng thái "chờ cập nhật"
routes.get('/additionalRequest/:username', AdminController.additionalRequest)

//Admin xem toàn bộ các giao dịch đang ở trạng thái "waiting"
routes.get('/waitingtransaction', AdminController.waitingTransactionList)

//Phê duyệt giao dịch 
routes.post('/approve', AdminController.Approve)

//Từ chối giao dịch
routes.post('/denied', AdminController.Denied)

// Admin thay đổi trạng thái người dùng
routes.post('/setuserstatus', AdminController.Status);

// Admin lấy dữ liệu các transaction
routes.get('/listtransaction', AdminController.getTransactions)

module.exports = routes;

