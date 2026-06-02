const express = require(
  "express"
);

const router =
  express.Router();

const publicController =
  require("./public.controller");

router.get(
  "/table/:qrToken",
  publicController.getTableSessionAndMenu
);

router.post(
  "/orders",
  publicController.placeOrder
);

module.exports = router;