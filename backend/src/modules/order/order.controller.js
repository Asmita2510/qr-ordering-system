const orderService = require(
  "./order.service"
);

const getOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await orderService.getOrders(
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await orderService.getOrderById(
        req.params.id,
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error.message,
    });
  }
};

const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await orderService.updateOrderStatus(
          req.params.id,
          req.body.status,
          req.user
            .restaurantId
        );

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const completeSession =
  async (req, res) => {
    try {
      const session =
        await orderService.completeSession(
          req.params.sessionId,
          req.user
            .restaurantId
        );

      return res.status(200).json({
        success: true,
        data: session,
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
  getOrders,
  getOrderById,
  updateOrderStatus,
  completeSession,
};