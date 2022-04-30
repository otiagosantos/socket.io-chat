const { httpServer, io } = require("./http");

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    })
});

httpServer.listen(3000, () => {
    console.log("Server on.");
});
