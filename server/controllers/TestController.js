"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var thor_io_vnext_1 = require("thor-io.vnext");
var TestController = /** @class */ (function (_super) {
    __extends(TestController, _super);
    function TestController(connection) {
        var _this = _super.call(this, connection) || this;
        _this.size = 0;
        return _this;
    }
    TestController.prototype.invokeAndReturn = function (data) {
        // will back what sent to callee
        this.invoke(data, "invokeAndReturn");
    };
    TestController.prototype.invokeAndSendToAll = function (data) {
        // will send what callee passes to all clients connected to 'test' , see @ControllerProperties
        this.invokeToAll(data, "invokeAndSendToAll");
    };
    TestController.prototype.publishTemperature = function (temperatue) {
        this.publishToAll(temperatue, "tempChange");
    };
    TestController.prototype.invokeAndSendOthers = function (data) {
        // will send what callee passes to all clients connected to 'test' except 'self' , see @ControllerProperties
        this.invokeToOthers(data, "invokeAndSendOthers");
    };
    TestController.prototype.invokeToExpr = function (data) {
        // create an expression, send just to clients 
        // what has an age >= 10;
        var expr = function (pre) {
            return pre.size >= 10;
        };
        this.invokeTo(expr, data, "invokeToExpr");
    };
    __decorate([
        thor_io_vnext_1.CanSet(true),
        __metadata("design:type", Number)
    ], TestController.prototype, "size", void 0);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "invokeAndReturn", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "invokeAndSendToAll", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "publishTemperature", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "invokeAndSendOthers", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "invokeToExpr", null);
    TestController = __decorate([
        thor_io_vnext_1.ControllerProperties("rdtest"),
        __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
    ], TestController);
    return TestController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.TestController = TestController;
//# sourceMappingURL=TestController.js.map