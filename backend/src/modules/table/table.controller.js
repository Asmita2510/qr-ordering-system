const tableService = require(
  "./table.service"
);

const createTable = async (
  req,
  res
) => {
  try {
    const table =
      await tableService.createTable(
        req.body,
        req.user.restaurantId
      );

    return res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getTables = async (
  req,
  res
) => {
  try {
    const tables =
      await tableService.getTables(
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: tables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTableById = async (
  req,
  res
) => {
  try {
    const table =
      await tableService.getTableById(
        req.params.id,
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: table,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTable = async (
  req,
  res
) => {
  try {
    const table =
      await tableService.updateTable(
        req.params.id,
        req.body,
        req.user.restaurantId
      );

    return res.status(200).json({
      success: true,
      data: table,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTable = async (
  req,
  res
) => {
  try {
    await tableService.deleteTable(
      req.params.id,
      req.user.restaurantId
    );

    return res.status(200).json({
      success: true,
      message:
        "Table deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
};