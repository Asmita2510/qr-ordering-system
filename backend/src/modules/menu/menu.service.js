const {
  MenuItem,
  MenuItemVariant,
  Category,
} = require("../../models");
const sequelize = require("../../config/db");
// const createMenuItem = async (
//   data,
//   restaurantId
// ) => {
//   const {
//     categoryId,
//     name,
//     description,
//     price,
//     foodType,
//   } = data;

//   const category = await Category.findOne({
//     where: {
//       id: categoryId,
//       restaurantId,
//     },
//   });

//   if (!category) {
//     throw new Error(
//       "Category not found"
//     );
//   }

//   const menuItem = await MenuItem.create({
//     restaurantId,
//     categoryId,
//     name,
//     description,
//     price,
//     foodType,
//   });

//   return menuItem;
// };

const createMenuItem = async (
  data,
  restaurantId
) => {
  const transaction =
    await sequelize.transaction();

  try {
    const {
      categoryId,
      name,
      description,
      foodType,
      variants,
    } = data;

    const category =
      await Category.findOne({
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

    const existingMenuItem =
  await MenuItem.findOne({
    where: {
      restaurantId,
      categoryId,
      name,
    },
  });

if (existingMenuItem) {
  throw new Error(
    "Menu item already exists"
  );
}

    const menuItem =
      await MenuItem.create(
        {
          restaurantId,
          categoryId,
          name,
          description,
          foodType,
        },
        { transaction }
      );

    if (
      variants &&
      variants.length
    ) {
      await MenuItemVariant.bulkCreate(
        variants.map(
          (variant) => ({
            menuItemId:
              menuItem.id,
            name:
              variant.name,
            price:
              variant.price,
          })
        ),
        { transaction }
      );
    }

    await transaction.commit();

    return menuItem;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
  {
    model: MenuItemVariant,
  },
]
  });
};

const getMenuItemById = async (
  menuItemId,
  restaurantId
) => {
  const menuItem = await MenuItem.findOne({
    where: {
      id: menuItemId,
      restaurantId,
    },
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
      {
        model: MenuItemVariant,
      },
    ],
  });

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  return menuItem;
};

const updateMenuItem = async (
  menuItemId,
  data,
  restaurantId
) => {
  const menuItem = await MenuItem.findOne({
    where: {
      id: menuItemId,
      restaurantId,
    },
  });

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  await menuItem.update({
    name: data.name ?? menuItem.name,
    description:
      data.description ??
      menuItem.description,
    foodType:
      data.foodType ??
      menuItem.foodType,
    categoryId:
      data.categoryId ??
      menuItem.categoryId,
  });

  return menuItem;
};

const deleteMenuItem = async (
  menuItemId,
  restaurantId
) => {
  const menuItem = await MenuItem.findOne({
    where: {
      id: menuItemId,
      restaurantId,
    },
  });

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  await menuItem.destroy();

  return true;
};

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};