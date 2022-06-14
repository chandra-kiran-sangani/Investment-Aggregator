const express = require('express');
const router = express.Router();

const investmentOptionsService = require("../services/investment-options");

router.get('/', async (req, res, next) => {
  try {
    res.json(await investmentOptionsService.getInvestmentOptions(req.query));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
