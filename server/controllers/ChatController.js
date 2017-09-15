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
var ChatMessage = /** @class */ (function () {
    function ChatMessage() {
    }
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
var ChatController = /** @class */ (function (_super) {
    __extends(ChatController, _super);
    function ChatController(connection) {
        return _super.call(this, connection) || this;
    }
    ChatController.prototype.sendChatMessage = function (chatMessage) {
        this.invokeToAll(chatMessage, "chatMessage", this.alias);
    };
    __decorate([
        thor_io_vnext_1.CanInvoke(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [ChatMessage]),
        __metadata("design:returntype", void 0)
    ], ChatController.prototype, "sendChatMessage", null);
    ChatController = __decorate([
        thor_io_vnext_1.ControllerProperties("chat"),
        __metadata("design:paramtypes", [thor_io_vnext_1.ThorIO.Connection])
    ], ChatController);
    return ChatController;
}(thor_io_vnext_1.ThorIO.Controller));
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map