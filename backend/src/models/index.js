const User = require("./User");
const Restaurant = require("./Restaurant");

Restaurant.hasMany(User, {
  foreignKey: "restaurantId",
});

User.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

module.exports = {
  User,
  Restaurant,
};