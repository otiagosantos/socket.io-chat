const { httpServer, io } = require("./http");
require("./websocket");

const defaultPORT = 3000;

httpServer.listen(process.env.PORT || defaultPORT, () => {
    console.log("Server on.");
});
