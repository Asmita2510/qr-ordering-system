const { Category } = require("../../models");

// const createCategory = async (data, restaurantId) => {
//   const existingCategory =
//   await Category.findOne({
//     where: {
//       restaurantId,
//       name,
//     },
//   });

// if (existingCategory) {
//   throw new Error(
//     "Category already exists"
//   );
// }
//     const category = await Category.create({
//     name: data.name,
//     restaurantId,
//     isDefault: false,
//   });

//   return category;
// };

const createCategory = async (data, restaurantId) => {
  const { name } = data;

  const existingCategory = await Category.findOne({
    where: {
      restaurantId,
      name,
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    name,
    restaurantId,
    isDefault: false,
  });
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