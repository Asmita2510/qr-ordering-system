const bcrypt = require("bcryptjs");
const sequelize = require("../../config/db");

const generateToken = require("../../utils/jwt");
const generateSlug = require("../../utils/generateSlug");

const {
  User,
  Restaurant,
  Subscription,
} = require("../../models");

const {
  ROLES,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_STATUS,
} = require("../../config/constants");

const registerOwner = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      name,
      email,
      password,
      restaurantName,
      phone,
    } = data;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const restaurant = await Restaurant.create(
      {
        name: restaurantName,
        slug: generateSlug(restaurantName),
        phone,
      },
      { transaction }
    );

    const owner = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role: ROLES.OWNER,
        restaurantId: restaurant.id,
      },
      { transaction }
    );

    await Subscription.create(
      {
        restaurantId: restaurant.id,
        planName: SUBSCRIPTION_PLANS.FREE,
        status: SUBSCRIPTION_STATUS.TRIAL,
        startDate: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    const token = generateToken({
      id: owner.id,
      role: owner.role,
      restaurantId: restaurant.id,
    });

    return {
      token,
      user: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        role: owner.role,
      },
      restaurant,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
    restaurantId: user.restaurantId,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  registerOwner,
  login,
};