const express = require("express");
const payPhoneCard = require('../controllers/phone-card');
const router = express.Router();

router.post('/phonecard', payPhoneCard);

module.exports = router;