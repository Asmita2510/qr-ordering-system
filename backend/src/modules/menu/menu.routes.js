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

router.post(
  "/:menuItemId/variants",
  authMiddleware,
  menuController.addVariant
);

router.patch(
  "/variants/:variantId",
  authMiddleware,
  menuController.updateVariant
);

router.delete(
  "/variants/:variantId",
  authMiddleware,
  menuController.deleteVariant
);

router.patch(
  "/:id/availability",
  authMiddleware,
  menuController.updateMenuAvailability
);

router.patch(
  "/variants/:variantId/availability",
  authMiddleware,
  menuController.updateVariantAvailability
);


module.exports = router;