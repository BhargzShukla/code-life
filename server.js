const io = require("socket.io")({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});

let currentCode = "";

io.on("connection", (socket) => {
  socket.on("clientSend", (arg) => {
    currentCode = arg;
  });
  socket.broadcast.emit("serverSend", currentCode);
});

let port = process.env.PORT || 8000;
io.listen(port);
