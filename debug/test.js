"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thor_io_client_vnext_1 = require("thor-io.client-vnext");
var TestApp = /** @class */ (function () {
    function TestApp() {
        var _this = this;
        var serverUrl = location.origin.replace(/^http/, 'ws');
        this.factory = new thor_io_client_vnext_1.ThorIOClient.Factory(serverUrl, ["rdtest", "chat"]);
        // We got a connection to server 
        this.factory.OnOpen = function () {
            _this.rdTestProxy = _this.factory.GetProxy("rdtest");
            console.log(_this.rdTestProxy);
            _this.chatProxy = _this.factory.GetProxy("chat");
            console.log(_this.chatProxy);
            // connect the Prox
            _this.rdTestProxy.Connect();
            _this.chatProxy.Connect();
            // When we got a connection ( proxy ) to the controller 
            _this.rdTestProxy.OnOpen = function () {
                _this.rdTestProxy.Subscribe("tempChange", function (data) {
                    _this.showData(data);
                });
                _this.chatProxy.Invoke("changeGroup", "lobby");
                _this.chatProxy.Invoke("changeNickName", "Marlon Brando");
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
            document.querySelector("#chat-message").addEventListener("keyup", function (evt) {
                var el = evt.target;
                if (evt.keyCode === 13) {
                    _this.chatProxy.Invoke("sendChatMessage", {
                        message: el.value
                    });
                    el.value = "";
                }
            });
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