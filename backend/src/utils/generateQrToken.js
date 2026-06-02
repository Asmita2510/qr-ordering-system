const crypto = require("crypto");

const generateQrToken = () => {
  return crypto
    .randomBytes(8)
    .toString("hex");
};

module.exports = generateQrToken;