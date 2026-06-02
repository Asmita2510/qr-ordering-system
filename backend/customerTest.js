const { io } =
  require(
    "socket.io-client"
  );

const socket = io(
  "http://localhost:5000"
);

socket.on(
  "connect",
  () => {
    console.log(
      "Connected"
    );

    socket.emit(
      "join_session",
      "f2dad360-8e00-4deb-8094-584600248e75"
    );
  }
);

socket.on(
  "ORDER_STATUS_UPDATED",
  (data) => {
    console.log(
      "Status Updated"
    );

    console.log(data);
  }
);