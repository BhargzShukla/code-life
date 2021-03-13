const io = require("socket.io")({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let currentCode = "";

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  // socket.join("codeRoom");
  socket.on("clientSend", (arg) => {
    currentCode = arg;
    console.log("currentCode = ", currentCode);
    socket.broadcast.emit("serverSend", currentCode);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
