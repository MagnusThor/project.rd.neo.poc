let express = require("express");

let app = express();
 
var thorio = require("thor-io.vnext").ThorIO;

import {TestController} from '../server/controllers/TestController'

var thorIO = new thorio.Engine(
    [
    thorio.Controllers.BrokerController,
    TestController
    ]
); 

var expressWs = require("express-ws")(app);

app.use("/", express.static("debug"));
app.use("/lib", express.static("node_modules")); 

app.ws("/", function (ws, req) {    
       thorIO.addWebSocket(ws,req);
});

var port = process.env.PORT || 1337;
app.listen(port);