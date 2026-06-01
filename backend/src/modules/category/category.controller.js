const categoryService = require("./category.service");

const createCategory = async (req, res) => {
  try {
    const category =
      await categoryService.createCategory(
        req.body,
        req.user.restaurantId
      );

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories =
      await categoryService.getCategories(
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
};