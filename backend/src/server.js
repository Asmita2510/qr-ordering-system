require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;
const http = require("http");

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database Connected");

    await sequelize.sync({
      alter: true,
    });

    console.log("Models Synced");

    const server =
  http.createServer(app);

const {
  initializeSocket,
} = require("./socket/socket");

initializeSocket(server);

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
    // app.listen(PORT, () => {
    //   console.log(`Server running on ${PORT}`);
    // });
  } catch (error) {
    console.log(error);
  }
}

startServer();