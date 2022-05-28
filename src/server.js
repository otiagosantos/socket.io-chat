const { httpServer, io } = require("./http");
require("./websocket");

httpServer.listen(3000, () => {
    console.log("Server on.");
});
