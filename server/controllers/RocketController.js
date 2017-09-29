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
var RocketController = /** @class */ (function (_super) {
    __extends(RocketController, _super);
    function RocketController(connection) {
        var _this = _super.call(this, connection) || this;
        // set default world;
        _this.world = "map1";
        return _this;
    }
    RocketController.prototype.setWorld = function (world) {
        this.world = world.value;
        this.invoke(this.world, "onWorldSet"); // confirm that world is set.
    };
    RocketController.prototype.moveRocket = function (vec3) {
        var _this = this;
        var expression = function (pre) {
            return pre.world == _this.world;
        }; // expression saying , this type of controller, but just same world!
        this.invokeTo(expression, vec3, "onRocketMove");
    };
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [NetworkEventMessage]),
        __metadata("design:returntype", void 0)
    ], RocketController.prototype, "setWorld", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [NetworkEventMessage]),
        __metadata("design:returntype", void 0)
    ], RocketController.prototype, "moveRocket", null);
    RocketController = __decorate([
        thor_io_vnext_1.ControllerProperties("rocketGame", false, 5000),
        __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
    ], RocketController);
    return RocketController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.RocketController = RocketController;
//# sourceMappingURL=RocketController.js.map