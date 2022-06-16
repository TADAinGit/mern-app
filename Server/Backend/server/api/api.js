const express = require('express');
// import authRouter from '../routers/auth.js';
// import accountRouter from '../routers/account.js'
const paymentRouter = require('../routes/payment');

const balanceRouter = require('../routes/balance');
const router = express.Router();

router.use('/payment', paymentRouter);
router.use('/balance', balanceRouter);

module.exports = router;