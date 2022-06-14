const express = require('express');
const router = express.Router();

const blockchainsService = require("../services/blockchains");

router.get('/', (req, res, next) => {
  try {
    res.json(blockchainsService.getBlockChains());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
