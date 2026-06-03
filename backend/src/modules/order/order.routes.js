const express = require(
  "express"
);

const router =
  express.Router();

const authMiddleware =
  require("../../middleware/authMiddleware");

const orderController =
  require("./order.controller");

router.get(
  "/",
  authMiddleware,
  orderController.getOrders
);

router.get(
  "/bill-requests",
  authMiddleware,
  orderController.getBillRequests
);

router.get(
  "/:id",
  authMiddleware,
  orderController.getOrderById
);

router.patch(
  "/:id/status",
  authMiddleware,
  orderController.updateOrderStatus
);

router.patch(
  "/session/:sessionId/complete",
  authMiddleware,
  orderController.completeSession
);



module.exports = router;