const User = require("./User");
const Restaurant = require("./Restaurant");
const Subscription = require("./Subscription");
const Category = require("./Category");
const MenuItem = require("./MenuItem");
const MenuItemVariant =
  require("./MenuItemVariant");
const Table = require("./Table");
const DiningSession = require(
  "./DiningSession"
);
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Restaurant.hasMany(User, {
  foreignKey: "restaurantId",
});

User.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

Restaurant.hasOne(Subscription, {
  foreignKey: "restaurantId",
});

Subscription.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

Restaurant.hasMany(Category, {
  foreignKey: "restaurantId",
});

Category.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

Restaurant.hasMany(MenuItem, {
  foreignKey: "restaurantId",
});

MenuItem.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

Category.hasMany(MenuItem, {
  foreignKey: "categoryId",
});

MenuItem.belongsTo(Category, {
  foreignKey: "categoryId",
});

MenuItem.hasMany(
  MenuItemVariant,
  {
    foreignKey: "menuItemId",
  }
);

MenuItemVariant.belongsTo(
  MenuItem,
  {
    foreignKey: "menuItemId",
  }
);

Restaurant.hasMany(Table, {
  foreignKey: "restaurantId",
});

Table.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

Table.hasMany(
  DiningSession,
  {
    foreignKey: "tableId",
  }
);

DiningSession.belongsTo(
  Table,
  {
    foreignKey: "tableId",
  }
);

Restaurant.hasMany(
  DiningSession,
  {
    foreignKey:
      "restaurantId",
  }
);

DiningSession.belongsTo(
  Restaurant,
  {
    foreignKey:
      "restaurantId",
  }
);

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

Table.hasMany(Order, {
  foreignKey: "tableId",
});

Order.belongsTo(Table, {
  foreignKey: "tableId",
});

Restaurant.hasMany(Order, {
  foreignKey: "restaurantId",
});

Order.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

MenuItem.hasMany(OrderItem, {
  foreignKey: "menuItemId",
});

OrderItem.belongsTo(MenuItem, {
  foreignKey: "menuItemId",
});

MenuItemVariant.hasMany(OrderItem, {
  foreignKey: "variantId",
});

OrderItem.belongsTo(MenuItemVariant, {
  foreignKey: "variantId",
});

module.exports = {
  User,
  Restaurant,
  Subscription,
  Category,
  MenuItem,
  MenuItemVariant,
  Table,
  DiningSession,
  Order,
  OrderItem,
};