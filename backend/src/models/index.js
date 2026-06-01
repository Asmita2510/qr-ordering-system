const User = require("./User");
const Restaurant = require("./Restaurant");
const Subscription = require("./Subscription");

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

module.exports = {
  User,
  Restaurant,
  Subscription,
};