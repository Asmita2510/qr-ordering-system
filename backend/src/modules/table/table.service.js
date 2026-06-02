const { Table } = require("../../models");

const createTable = async (
  data,
  restaurantId
) => {
  const existingTable =
    await Table.findOne({
      where: {
        restaurantId,
        tableNumber:
          data.tableNumber,
      },
    });

  if (existingTable) {
    throw new Error(
      "Table number already exists"
    );
  }

  return await Table.create({
    restaurantId,
    tableNumber:
      data.tableNumber,
    capacity:
      data.capacity || 4,
  });
};

const getTables = async (
  restaurantId
) => {
  return await Table.findAll({
    where: {
      restaurantId,
    },
    order: [
      ["tableNumber", "ASC"],
    ],
  });
};

const getTableById = async (
  tableId,
  restaurantId
) => {
  const table =
    await Table.findOne({
      where: {
        id: tableId,
        restaurantId,
      },
    });

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  return table;
};

const updateTable = async (
  tableId,
  data,
  restaurantId
) => {
  const table =
    await Table.findOne({
      where: {
        id: tableId,
        restaurantId,
      },
    });

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  await table.update({
    tableNumber:
      data.tableNumber ??
      table.tableNumber,

    capacity:
      data.capacity ??
      table.capacity,

    status:
      data.status ??
      table.status,
  });

  return table;
};

const deleteTable = async (
  tableId,
  restaurantId
) => {
  const table =
    await Table.findOne({
      where: {
        id: tableId,
        restaurantId,
      },
    });

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  await table.destroy();

  return true;
};

module.exports = {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
};