const express = require(
  "express"
);

const router =
  express.Router();

const authMiddleware =
  require("../../middleware/authMiddleware");

const tableController =
  require("./table.controller");

router.post(
  "/",
  authMiddleware,
  tableController.createTable
);

router.get(
  "/",
  authMiddleware,
  tableController.getTables
);

router.get(
  "/:id",
  authMiddleware,
  tableController.getTableById
);

router.patch(
  "/:id",
  authMiddleware,
  tableController.updateTable
);

router.delete(
  "/:id",
  authMiddleware,
  tableController.deleteTable
);

module.exports = router;