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
      price,
      variants,
    } = data;

    if (
  (!variants || variants.length === 0) &&
  !price
) {
  throw new Error(
    "Price is required when no variants exist"
  );
}

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
          price: variants?.length
      ? null
      : price,
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

const addVariant = async (
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

  const existingVariant =
    await MenuItemVariant.findOne({
      where: {
        menuItemId,
        name: data.name,
      },
    });

  if (existingVariant) {
    throw new Error(
      "Variant already exists"
    );
  }

  return await MenuItemVariant.create({
    menuItemId,
    name: data.name,
    price: data.price,
  });
};

const updateVariant = async (
  variantId,
  data,
  restaurantId
) => {
  const variant =
    await MenuItemVariant.findOne({
      where: {
        id: variantId,
      },
      include: [
        {
          model: MenuItem,
          where: {
            restaurantId,
          },
        },
      ],
    });

  if (!variant) {
    throw new Error(
      "Variant not found"
    );
  }

  await variant.update({
    name:
      data.name ??
      variant.name,

    price:
      data.price ??
      variant.price,
  });

  return variant;
};

const deleteVariant = async (
  variantId,
  restaurantId
) => {
  const variant =
    await MenuItemVariant.findOne({
      where: {
        id: variantId,
      },
      include: [
        {
          model: MenuItem,
          where: {
            restaurantId,
          },
        },
      ],
    });

  if (!variant) {
    throw new Error(
      "Variant not found"
    );
  }

  await variant.destroy();

  return true;
};

// const updateMenuAvailability = async (
//     menuItemId,
//     isAvailable,
//     restaurantId
//   ) => {
//     const menuItem =
//       await MenuItem.findOne({
//         where: {
//           id: menuItemId,
//           restaurantId,
//         },
//       });

//     if (!menuItem) {
//       throw new Error(
//         "Menu item not found"
//       );
//     }

//     menuItem.isAvailable =
//       isAvailable;

//     await menuItem.save();

//     return menuItem;
//   };

const updateMenuAvailability = async (
  menuItemId,
  isAvailable,
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
    isAvailable,
  });

  await MenuItemVariant.update(
    {
      isAvailable,
    },
    {
      where: {
        menuItemId,
      },
    }
  );

  return menuItem;
};

const updateVariantAvailability = async (
  variantId,
  isAvailable,
  restaurantId
) => {
  const variant =
    await MenuItemVariant.findOne({
      where: {
        id: variantId,
      },
      include: [
        {
          model: MenuItem,
          where: {
            restaurantId,
          },
        },
      ],
    });

  if (!variant) {
    throw new Error("Variant not found");
  }

  await variant.update({
    isAvailable,
  });

  const menuItemId =
    variant.menuItemId;

  const availableVariants =
    await MenuItemVariant.count({
      where: {
        menuItemId,
        isAvailable: true,
      },
    });

  await MenuItem.update(
    {
      isAvailable:
        availableVariants > 0,
    },
    {
      where: {
        id: menuItemId,
      },
    }
  );

  return variant;
};

// const updateVariantAvailability = async (
//     variantId,
//     isAvailable,
//     restaurantId
//   ) => {
//     const variant =
//       await MenuItemVariant.findOne({
//         where: {
//           id: variantId,
//         },
//         include: [
//           {
//             model: MenuItem,
//             where: {
//               restaurantId,
//             },
//           },
//         ],
//       });

//     if (!variant) {
//       throw new Error(
//         "Variant not found"
//       );
//     }

//     variant.isAvailable =
//       isAvailable;

//     await variant.save();

//     return variant;
//   };

const uploadMenuItemImage =
  async (
    menuItemId,
    imagePath,
    restaurantId
  ) => {
    const menuItem =
      await MenuItem.findOne({
        where: {
          id: menuItemId,
          restaurantId,
        },
      });

    if (!menuItem) {
      throw new Error(
        "Menu item not found"
      );
    }

    menuItem.image =
      imagePath;

    await menuItem.save();

    return menuItem;
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

  uploadMenuItemImage,
};