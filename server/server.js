"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var thorio = require("thor-io.vnext").ThorIO;
var TestController_1 = require("../server/controllers/TestController");
var ChatController_1 = require("../server/controllers/ChatController");
var thorIO = new thorio.Engine([
    thorio.Controllers.BrokerController,
    TestController_1.TestController,
    ChatController_1.ChatController
]);
var expressWs = require("express-ws")(app);
app.use("/", express.static("debug"));
app.use("/lib", express.static("node_modules"));
app.ws("/", function (ws, req) {
    thorIO.addWebSocket(ws, req);
});
var port = process.env.PORT || 1337;
app.listen(port);
//# sourceMappingURL=server.js.map