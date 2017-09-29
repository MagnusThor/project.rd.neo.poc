"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thor_io_client_vnext_1 = require("thor-io.client-vnext");
var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        ;
    };
    Vector3.prototype.normalize = function () {
        var lengthval = this.length();
        if (lengthval != 0) {
            this.x /= lengthval;
            this.y /= lengthval;
            this.z /= lengthval;
            return true;
        }
        else {
            return false;
        }
    };
    Vector3.prototype.angle = function (vectorB) {
        var anorm = new Vector3(this.x, this.y, this.z);
        anorm.normalize();
        var bnorm = new Vector3(vectorB.x, vectorB.y, vectorB.z);
        bnorm.normalize();
        var dot = anorm.dot(bnorm);
        return Math.acos(dot);
    };
    Vector3.prototype.cross = function (vectorB) {
        var tempvec = new Vector3(this.x, this.y, this.z);
        tempvec.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tempvec.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tempvec.z = (this.x * vectorB.y) - (this.y * vectorB.x);
        this.x = tempvec.x;
        this.y = tempvec.y;
        this.z = tempvec.z;
    };
    Vector3.prototype.dot = function (b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    };
    return Vector3;
}());
var NetworkEventMessage = /** @class */ (function () {
    function NetworkEventMessage(data) {
        this.value = data;
        this.ts = performance.now();
    }
    return NetworkEventMessage;
}());
var TestApp = /** @class */ (function () {
    function TestApp() {
        var _this = this;
        var serverUrl = location.origin.replace(/^http/, 'ws');
        this.factory = new thor_io_client_vnext_1.ThorIOClient.Factory(serverUrl, ["rdtest", "rocketGame", "chat"]);
        // We got a connection to server 
        this.factory.OnOpen = function () {
            _this.rdTestProxy = _this.factory.GetProxy("rdtest");
            console.log(_this.rdTestProxy);
            _this.chatProxy = _this.factory.GetProxy("chat");
            console.log(_this.chatProxy);
            _this.rocketController = _this.factory.GetProxy("rocketGame");
            console.log(_this.rocketController);
            // connect the Prox
            // When we got a connection ( proxy ) to the controller 
            _this.rdTestProxy.OnOpen = function () {
                _this.rdTestProxy.Subscribe("tempChange", function (data) {
                    _this.showData(data);
                });
                _this.chatProxy.Invoke("changeGroup", "lobby");
                _this.chatProxy.Invoke("changeNickName", "Marlon Brando");
            };
            _this.rocketController.OnOpen = function () {
                _this.rocketController.On("onRocketMove", (function (move) {
                    _this.showData(move);
                }));
            };
            // set up listeners 
            _this.rdTestProxy.On("invokeAndReturn", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeAndSendToAll", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeAndSendOthers", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeToExpr", function (data) { _this.showData(data); });
            _this.chatProxy.On("chatMessage", function (data) { _this.showData(data); });
            // add event listeners for the UI and Invokes...
            document.querySelector("#btn-invoke").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeAndReturn", {
                    text: "invokeAndReturn called",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-invokeAll").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeAndSendToAll", {
                    text: "invokeAndSendToAll called",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-invokeOthers").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeAndSendOthers", {
                    text: "invokeAndSendOthers",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-invokeTo").addEventListener("click", function (e) {
                _this.rdTestProxy.Invoke("invokeToExpr", {
                    text: "invokeToExpr called",
                    num: 1 + Math.random() * 10,
                });
            });
            document.querySelector("#btn-setProperty").addEventListener("click", function (e) {
                _this.rdTestProxy.SetProperty("size", 11);
            });
            document.querySelector("#btn-publishTemp").addEventListener("click", function (e) {
                var temperatue = {
                    temp: 1. + Math.random() * 10
                };
                _this.rdTestProxy.Publish("publishTemperature", temperatue);
            });
            document.querySelector("#btn-rocketmove").addEventListener("click", function (e) {
                setInterval(function () {
                    var vec3 = new Vector3(Math.random(), Math.random(), Math.random());
                    var msg = new NetworkEventMessage(vec3);
                    _this.rocketController.Invoke("moveRocket", msg);
                }, 100);
            });
            document.querySelector("#chat-message").addEventListener("keyup", function (evt) {
                var el = evt.target;
                if (evt.keyCode === 13) {
                    _this.chatProxy.Invoke("sendChatMessage", {
                        message: el.value
                    });
                    el.value = "";
                }
            });
            console.log("...connect");
            _this.rdTestProxy.Connect();
            _this.chatProxy.Connect();
            _this.rocketController.Connect();
        };
    }
    TestApp.prototype.showData = function (data) {
        var parent = document.querySelector("#debug");
        var el = document.createElement("pre");
        el.textContent = JSON.stringify(data);
        parent.insertBefore(el, parent.firstChild);
    };
    ;
    return TestApp;
}());
exports.TestApp = TestApp;
document.addEventListener("DOMContentLoaded", function () {
    var testApp = new TestApp();
    console.log("testApp", testApp);
});
//# sourceMappingURL=test.js.map