const { io } = require("./http");

io.on("connection", (socket) => {
    socket.broadcast.emit("chat event", "someone conected");

    socket.on("disconnect", () => {
        socket.broadcast.emit("chat event", "someone disconected");
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    })
});