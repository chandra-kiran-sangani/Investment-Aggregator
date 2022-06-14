const express = require('express');
const router = express.Router();

const blockchainsRouter = require("./blockchains");
const protocolsRouter = require("./protocols");
const investmentOptionsRouter = require("./investment-options");

router.use('/blockchains', blockchainsRouter);
router.use('/protocols', protocolsRouter);
router.use('/investment-options', investmentOptionsRouter);

module.exports = router;
