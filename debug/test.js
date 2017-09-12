"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thor_io_client_vnext_1 = require("thor-io.client-vnext");
var TestApp = /** @class */ (function () {
    function TestApp() {
        var _this = this;
        var serverUrl = location.origin.replace(/^http/, 'ws');
        this.factory = new thor_io_client_vnext_1.ThorIOClient.Factory(serverUrl, ["rdtest"]);
        // We got a connection to server 
        this.factory.OnOpen = function (a) {
            _this.rdTestProxy = a;
            // connect the Prox
            _this.rdTestProxy.Connect();
            // When we got a connection ( proxy ) to the controller 
            _this.rdTestProxy.OnOpen = function () {
                _this.rdTestProxy.Subscribe("tempChange", function (data) {
                    _this.showData(data);
                });
            };
            // set up listeners 
            _this.rdTestProxy.On("invokeAndReturn", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeAndSendToAll", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeAndSendOthers", function (data) { _this.showData(data); });
            _this.rdTestProxy.On("invokeToExpr", function (data) { _this.showData(data); });
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