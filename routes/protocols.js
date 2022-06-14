const express = require('express');
const router = express.Router();

const protocolsService = require("../services/protocols");

router.get('/', (req, res, next) => {
  try {
    res.json(protocolsService.getProtocols(req.query));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
