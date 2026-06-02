const express = require("express");

const router = express.Router();


const authRoutes = require(
  "../modules/auth/auth.routes"
);
const menuRoutes = require(
  "../modules/menu/menu.routes"
);
const categoryRoutes = require("../modules/category/category.routes");
const tableRoutes = require(
  "../modules/table/table.routes"
);
const publicRoutes = require(
  "../modules/public/public.routes"
);
const orderRoutes = require(
  "../modules/order/order.routes"
);

router.use(
  "/orders",
  orderRoutes
);

router.use(
  "/tables",
  tableRoutes
);
router.use("/auth", authRoutes);
router.use("/categories",categoryRoutes);
router.use("/menu", menuRoutes);
router.use(
  "/public",
  publicRoutes
);

module.exports = router;