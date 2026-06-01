const {
  MenuItem,
  Category,
} = require("../../models");

const createMenuItem = async (
  data,
  restaurantId
) => {
  const {
    categoryId,
    name,
    description,
    price,
    foodType,
  } = data;

  const category = await Category.findOne({
    where: {
      id: categoryId,
      restaurantId,
    },
  });

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  const menuItem = await MenuItem.create({
    restaurantId,
    categoryId,
    name,
    description,
    price,
    foodType,
  });

  return menuItem;
};

const getMenuItems = async (
  restaurantId
) => {
  return await MenuItem.findAll({
    where: {
      restaurantId,
    },
    include: [
      {
        model: Category,
        attributes: [
          "id",
          "name",
        ],
      },
    ],
  });
};

module.exports = {
  createMenuItem,
  getMenuItems,
};