const {
  Table,
  DiningSession,
  Restaurant,
  Category,
  MenuItem,
  Order,
  OrderItem,
  MenuItemVariant,
} = require("../../models");

const sequelize = require("../../config/db");
const {
  getIO,
} = require("../../socket/socket");
const getTableSessionAndMenu = async (
  qrToken
) => {
  const table = await Table.findOne({
    where: {
      qrToken,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!table) {
    throw new Error(
      "Invalid QR Code"
    );
  }

  let session =
    await DiningSession.findOne({
      where: {
        tableId: table.id,
        status: "ACTIVE",
      },
    });

  if (!session) {
    session =
      await DiningSession.create({
        restaurantId:
          table.restaurantId,

        tableId: table.id,

        status: "ACTIVE",

        startedAt: new Date(),
      });

    await table.update({
      status: "OCCUPIED",
    });
  }

  const categories =
    await Category.findAll({
      where: {
        restaurantId:
          table.restaurantId,
      },

      include: [
        {
          model: MenuItem,

          where: {
            isAvailable: true,
          },

          required: false,

          include: [
            {
              model:
                MenuItemVariant,
            },
          ],
        },
      ],

      order: [
        ["displayOrder", "ASC"],
      ],
    });

  return {
    restaurant: {
      id: table.Restaurant.id,
      name:
        table.Restaurant.name,
    },

    table: {
      id: table.id,
      tableNumber:
        table.tableNumber,
    },

    sessionId: session.id,

    categories,
  };
};

const placeOrder = async (
  sessionId,
  items
) => {
  const transaction =
    await sequelize.transaction();

  try {
    const session =
      await DiningSession.findOne({
        where: {
          id: sessionId,
          status: "ACTIVE",
        },
      });

    if (!session) {
      throw new Error(
        "Session not found"
      );
    }

    const lastOrder =
  await Order.findOne({
    where: {
      restaurantId:
        session.restaurantId,
    },

    order: [
      ["orderNumber", "DESC"],
    ],
  });

//   console.log("last order",lastOrder)

const nextOrderNumber =
  lastOrder
    ? lastOrder.orderNumber + 1
    : 1;

    console.log("LAST ORDER:", lastOrder?.orderNumber);
console.log("NEXT ORDER:", nextOrderNumber);

    const order =
      await Order.create(
        {
          restaurantId:
            session.restaurantId,

          tableId:
            session.tableId,

          sessionId:
            session.id,

          orderNumber:
      nextOrderNumber,

          status: "PLACED",
        },
        { transaction }
      );

    const orderItems = [];

    for (const item of items) {
      const menuItem =
        await MenuItem.findByPk(
          item.menuItemId
        );

      if (!menuItem) {
        throw new Error(
          "Menu item not found"
        );
      }

      if (!menuItem.isAvailable) {
  throw new Error(
    `${menuItem.name} is unavailable`
  );
}

      let unitPrice;

      // Variant Item
      if (item.variantId) {
        const variant =
          await MenuItemVariant.findOne(
            {
              where: {
                id: item.variantId,
                menuItemId:
                  menuItem.id,
              },
            }
          );

        if (!variant) {
          throw new Error(
            "Variant not found"
          );
        }

if (
  item.variantId &&
  !variant.isAvailable
) {
  throw new Error(
    `${variant.name} is unavailable`
  );
}
        
        unitPrice =
          Number(
            variant.price
          );
      }

      // Fixed Price Item
      else {
        unitPrice =
          Number(
            menuItem.price
          );
      }

      const totalPrice =
        unitPrice *
        item.quantity;

      const orderItem =
        await OrderItem.create(
          {
            orderId:
              order.id,

            menuItemId:
              menuItem.id,

            variantId:
              item.variantId ||
              null,

            quantity:
              item.quantity,

            unitPrice,

            totalPrice,

            specialInstructions:
              item.specialInstructions ||
              null,
          },
          { transaction }
        );

      orderItems.push(
        orderItem
      );
    }

    await transaction.commit();

    const table = await Table.findByPk(
  session.tableId
);

    getIO()
  .to(
    `restaurant_${session.restaurantId}`
  )
  .emit(
    "NEW_ORDER",
    {
      orderId: order.id,
      orderNumber: order.orderNumber,
      tableNumber:
        table.tableNumber,
        status:order.status,
      sessionId:
        session.id,
    }
  );

    return {
      order,
      orderItems,
    };
  } catch (error) {
  if (!transaction.finished) {
    await transaction.rollback();
  }

  throw error;
}
};

const getSessionOrders = async (
  sessionId
) => {
  const session =
    await DiningSession.findByPk(
      sessionId
    );

  if (!session) {
    throw new Error(
      "Session not found"
    );
  }

  return await Order.findAll({
    where: {
      sessionId,
    },

    include: [
      {
        model: OrderItem,

        include: [
          {
            model: MenuItem,
          },

          {
            model:
              MenuItemVariant,
          },
        ],
      },
    ],

    order: [
      ["orderNumber", "DESC"],
    ],
  });
};

const requestBill = async (
  sessionId
) => {
  const session =
    await DiningSession.findOne({
      where: {
        id: sessionId,
        status: "ACTIVE",
      },
    });

  if (!session) {
    throw new Error(
      "Session not found"
    );
  }

  session.billRequested = true;

  await session.save();

  return session;
};



module.exports = {
  getTableSessionAndMenu,
  placeOrder,
  getSessionOrders,
  requestBill,
};