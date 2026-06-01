const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../../middleware/authMiddleware"
);

const menuController = require(
  "./menu.controller"
);

router.post(
  "/",
  authMiddleware,
  menuController.createMenuItem
);

router.get(
  "/",
  authMiddleware,
  menuController.getMenuItems
);

module.exports = router;