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
var MessageModel = /** @class */ (function () {
    function MessageModel(message, sender) {
        this.message = message;
        this.sender = sender;
        this.ts = new Date();
    }
    return MessageModel;
}());
exports.MessageModel = MessageModel;
var ChatController = /** @class */ (function (_super) {
    __extends(ChatController, _super);
    function ChatController(connection) {
        var _this = _super.call(this, connection) || this;
        _this.group = "lobby";
        return _this;
    }
    ChatController.prototype.changeNickName = function (nickName) {
        this.nickName = nickName;
        this.invoke({ nickName: this.nickName }, "onNickNameChange");
    };
    ChatController.prototype.changeGroup = function (group) {
        this.group = group;
        this.invoke({ group: this.group }, "onGroupChange");
    };
    ChatController.prototype.sendChatMessage = function (chatMessage) {
        var _this = this;
        var expr = function (pre) {
            return pre.group === _this.group;
        };
        chatMessage.ts = new Date();
        chatMessage.sender = this.nickName;
        this.invokeTo(expr, chatMessage, "chatMessage", this.alias);
    };
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "changeNickName", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "changeGroup", null);
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MessageModel]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "sendChatMessage", null);
    ChatController = __decorate([
        thor_io_vnext_1.ControllerProperties("chat", false, 5000),
        __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
    ], ChatController);
    return ChatController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map