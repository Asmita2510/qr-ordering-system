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

router.get(
  "/:id",
  authMiddleware,
  menuController.getMenuItemById
);

router.patch(
  "/:id",
  authMiddleware,
  menuController.updateMenuItem
);

router.delete(
  "/:id",
  authMiddleware,
  menuController.deleteMenuItem
);

module.exports = router;