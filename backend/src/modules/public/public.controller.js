const publicService = require(
  "./public.service"
);

const getTableSessionAndMenu =
  async (req, res) => {
    try {
      const result =
        await publicService.getTableSessionAndMenu(
          req.params.qrToken
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  const placeOrder = async (
  req,
  res
) => {
  try {
    const result =
      await publicService.placeOrder(
        req.body.sessionId,
        req.body.items
      );

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getSessionOrders =
  async (req, res) => {
    try {
      const orders =
        await publicService.getSessionOrders(
          req.params.sessionId
        );

      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const requestBill = async (
  req,
  res
) => {
  try {
    const session =
      await publicService.requestBill(
        req.body.sessionId
      );

    return res.status(200).json({
      success: true,
      message:
        "Bill requested successfully",
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
  getTableSessionAndMenu,
  placeOrder,
  getSessionOrders,
  requestBill
};