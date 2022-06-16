const express = require('express');
const { balanceDeposit, balanceWithdraw, balanceTransfer } = require('../controllers/balance');
const { checkCreditCard, verifyJWT } = require('../middleware/checker');

const router = express.Router();

router.post('/deposit', verifyJWT, checkCreditCard, balanceDeposit);

router.post('/withdraw', verifyJWT, checkCreditCard, balanceWithdraw);

router.post('/transfer', verifyJWT, balanceTransfer);

module.exports = router;