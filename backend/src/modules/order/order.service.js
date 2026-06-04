const {
  Order,
  OrderItem,
  MenuItem,
  MenuItemVariant,
  DiningSession,
  Table,
} = require("../../models");

const getOrders = async (
  restaurantId
) => {
  return await Order.findAll({
    where: {
      restaurantId,
    },

    include: [
      {
        model: Table,
        attributes: [
          "id",
          "tableNumber",
        ],
      },

      {
        model: OrderItem,

        include: [
          {
            model: MenuItem,
            attributes: [
              "id",
              "name",
            ],
          },

          {
            model:
              MenuItemVariant,
            attributes: [
              "id",
              "name",
            ],
          },
        ],
      },
    ],

    order: [
      ["createdAt", "DESC"],
    ],
  });
};

const getOrderById = async (
  orderId,
  restaurantId
) => {
  const order =
    await Order.findOne({
      where: {
        id: orderId,
        restaurantId,
      },

      include: [
        {
          model: OrderItem,

          include: [
            MenuItem,
            MenuItemVariant,
          ],
        },
      ],
    });

  if (!order) {
    throw new Error(
      "Order not found"
    );
  }

  return order;
};

const {getIO} = require("../../socket/socket")

const updateOrderStatus =
  async (
    orderId,
    status,
    restaurantId
  ) => {
    const order =
      await Order.findOne({
        where: {
          id: orderId,
          restaurantId,
        },
      });

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    const allowedStatuses =
      [
        "PLACED",
        "PREPARING",
        "READY",
        "SERVED",
        "CANCELLED",
      ];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      throw new Error(
        "Invalid status"
      );
    }

    order.status = status;

    await order.save();

    getIO()
  .to(
    `session_${order.sessionId}`
  )
  .emit(
    "ORDER_STATUS_UPDATED",
    {
      orderId: order.id,
      orderNumber:
        order.orderNumber,
      status:
        order.status,
      tableId:order.tableId,
      updatedAt:order.updatedAt,
    }
  );

    return order;
  };

const completeSession =
  async (
    sessionId,
    restaurantId
  ) => {
    const session =
      await DiningSession.findOne(
        {
          where: {
            id: sessionId,
            restaurantId,
          },

          include: [Table],
        }
      );

    if (!session) {
      throw new Error(
        "Session not found"
      );
    }

    session.status =
      "COMPLETED";

    session.completedAt =
      new Date();

    session.billRequested = false;
      
    await session.save();

    await session.Table.update(
      {
        status:
          "AVAILABLE",
      }
    );

    return session;
  };

const getBillRequests =
  async (
    restaurantId
  ) => {
    return await DiningSession.findAll(
      {
        where: {
          restaurantId,
          billRequested:
            true,
          status:
            "ACTIVE",
        },

        include: [Table],
      }
    );
  };

module.exports = {
  getOrders,
  getOrderById,
  updateOrderStatus,
  completeSession,
  getBillRequests,
};