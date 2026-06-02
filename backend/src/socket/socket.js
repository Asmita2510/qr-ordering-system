let io;

const initializeSocket = (
  server
) => {
  const {
    Server,
  } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on(
    "connection",
    (socket) => {
      console.log(
        "Client connected:",
        socket.id
      );

      socket.on(
        "disconnect",
        () => {
          console.log(
            "Client disconnected:",
            socket.id
          );
        }
      );

      socket.on(
  "join_session",
  (sessionId) => {
    socket.join(
      `session_${sessionId}`
    );

    console.log(
      `Joined session_${sessionId}`
    );
  }
);

      socket.on(
  "join_restaurant",
  (restaurantId) => {
    socket.join(
      `restaurant_${restaurantId}`
    );

    console.log(
      `Joined restaurant_${restaurantId}`
    );
  }
);
    }
  );

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO not initialized"
    );
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};