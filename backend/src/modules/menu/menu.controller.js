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

const getMenuItemById = async (
  req,
  res
) => {
  try {
    const menuItem =
      await menuService.getMenuItemById(
        req.params.id,
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMenuItem = async (
  req,
  res
) => {
  try {
    const menuItem =
      await menuService.updateMenuItem(
        req.params.id,
        req.body,
        req.user.restaurantId
      );

    return res.status(200).json({
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

const deleteMenuItem = async (
  req,
  res
) => {
  try {
    await menuService.deleteMenuItem(
      req.params.id,
      req.user.restaurantId
    );

    return res.status(200).json({
      success: true,
      message:
        "Menu item deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const addVariant = async (req, res) => {
  try {
    const variant = await menuService.addVariant(
      req.params.menuItemId,
      req.body,
      req.user.restaurantId
    );

    return res.status(201).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVariant = async (req, res) => {
  try {
    const variant = await menuService.updateVariant(
      req.params.variantId,
      req.body,
      req.user.restaurantId
    );

    return res.status(200).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVariant = async (req, res) => {
  try {
    await menuService.deleteVariant(
      req.params.variantId,
      req.user.restaurantId
    );

    return res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMenuAvailability = async (
  req,
  res
) => {
  try {
    const menuItem =
      await menuService.updateMenuAvailability(
        req.params.id,
        req.body.isAvailable,
        req.user.restaurantId
      );

    return res.status(200).json({
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

const updateVariantAvailability = async (
  req,
  res
) => {
  try {
    const variant =
      await menuService.updateVariantAvailability(
        req.params.variantId,
        req.body.isAvailable,
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadImage =
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Image is required",
          });
      }

      const imagePath =
        `/uploads/menu-items/${req.file.filename}`;

      const menuItem =
        await menuService.uploadMenuItemImage(
          req.params.id,
          imagePath,
          req.user
            .restaurantId
        );

      return res.status(200).json({
        success: true,
        data: menuItem,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,

  addVariant,
  updateVariant,
  deleteVariant,

  updateMenuAvailability,
  updateVariantAvailability,

  uploadImage,
};