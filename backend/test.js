const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit(
    "join_restaurant",
    "4e2b1969-582c-4bed-aeb4-1fa108cf4eb4"
  );
});

socket.on(
  "NEW_ORDER",
  (data) => {
    console.log(
      "New Order Received:"
    );
    console.log(data);
  }
);