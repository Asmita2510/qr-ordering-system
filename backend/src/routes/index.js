const express = require("express");

const router = express.Router();


const authRoutes = require(
  "../modules/auth/auth.routes"
);
const menuRoutes = require(
  "../modules/menu/menu.routes"
);
const categoryRoutes = require("../modules/category/category.routes");

router.use("/auth", authRoutes);
router.use("/categories",categoryRoutes);
router.use("/menu", menuRoutes);

module.exports = router;