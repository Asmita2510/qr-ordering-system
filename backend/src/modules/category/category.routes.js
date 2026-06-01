const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../../middleware/roleMiddleware"
);

const categoryController = require(
  "./category.controller"
);

const { ROLES } = require(
  "../../config/constants"
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.OWNER,
    ROLES.MANAGER
  ),
  categoryController.createCategory
);

router.get(
  "/",
  authMiddleware,
  categoryController.getCategories
);

module.exports = router;