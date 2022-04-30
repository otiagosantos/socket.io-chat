const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { router } = require("../routes");

const expressServer = express();

expressServer.use(express.static('public'))
expressServer.use(express.json());
expressServer.use(router);

const httpServer = createServer(expressServer);

const io = new Server(httpServer);

module.exports = { expressServer, httpServer, io }