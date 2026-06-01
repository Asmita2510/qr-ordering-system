const { Category } = require("../../models");

const createCategory = async (data, restaurantId) => {
  const category = await Category.create({
    name: data.name,
    restaurantId,
    isDefault: false,
  });

  return category;
};

const getCategories = async (restaurantId) => {
  return await Category.findAll({
    where: {
      restaurantId,
    },
    order: [["createdAt", "ASC"]],
  });
};

module.exports = {
  createCategory,
  getCategories,
};