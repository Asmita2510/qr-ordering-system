const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

const generateQRCode = async (
  qrToken
) => {
  const dir = path.join(
    process.cwd(),
    "uploads",
    "qr-codes"
  );

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }

  const filePath = path.join(
    dir,
    `${qrToken}.png`
  );

  const qrUrl =
    `http://localhost:3000/menu/${qrToken}`;

  await QRCode.toFile(
    filePath,
    qrUrl
  );

  return `/uploads/qr-codes/${qrToken}.png`;
};

module.exports =
  generateQRCode;