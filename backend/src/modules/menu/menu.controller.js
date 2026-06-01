const menuService = require("./menu.service");

const createMenuItem = async (
  req,
  res
) => {
  try {
    const menuItem =
      await menuService.createMenuItem(
        req.body,
        req.user.restaurantId
      );

    return res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMenuItems = async (
  req,
  res
) => {
  try {
    const menuItems =
      await menuService.getMenuItems(
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
};