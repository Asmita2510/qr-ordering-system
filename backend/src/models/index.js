const User = require("./User");
const Restaurant = require("./Restaurant");
const Subscription = require("./Subscription");
const Category = require("./Category");
const MenuItem = require("./MenuItem");
const MenuItemVariant =
  require("./MenuItemVariant");

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

module.exports = {
  User,
  Restaurant,
  Subscription,
  Category,
  MenuItem,
  MenuItemVariant,
};