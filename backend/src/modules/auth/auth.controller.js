const authService = require("./auth.service");

const registerOwner = async (req, res) => {
  try {
    const result =
      await authService.registerOwner(req.body);

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(
      req.body
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerOwner,
  login,
};