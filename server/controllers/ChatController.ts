
import {
    ThorIO,
    ControllerProperties,
    CanInvoke,
    CanSet
} from 'thor-io.vnext'

export class MessageModel{
        message:string;
        sender: string;
        ts: Date;
        constructor(message:string,sender:string){
            this.message = message;
            this.sender = sender;
            this.ts = new Date();
        }
}

@ControllerProperties("chat")
export class ChatController extends ThorIO.Controller {
    private nickName:string;
    private group: string;
    constructor(connection: ThorIO.Connection) {
        super(connection);
        this.group = "lobby";
    }
    @CanInvoke(true)
    changeNickName(nickName:string){
            this.nickName = nickName;
            this.invoke({nickName:this.nickName},"onNickNameChange");
    }
    @CanInvoke(true)
    changeGroup(group:string){
            this.group = group;
            this.invoke({group:this.group},"onGroupChange");
    }
    @CanInvoke(true)
    sendChatMessage(chatMessage:MessageModel){
            let expr = (pre:ChatController) =>{
                    return pre.group === this.group;
            }
            chatMessage.ts = new Date();
            chatMessage.sender = this.nickName;
            this.invokeTo(expr,chatMessage,"chatMessage",this.alias);
    }
}

