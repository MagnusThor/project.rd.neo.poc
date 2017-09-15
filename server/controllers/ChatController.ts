
import {
    ThorIO,
    ControllerProperties,
    CanInvoke,
    CanSet
} from 'thor-io.vnext'

export class ChatMessage{
        message:string;
        constructor(){}
}

@ControllerProperties("chat")
export class ChatController extends ThorIO.Controller {
    constructor(connection: ThorIO.Connection) {
        super(connection);
    }

    @CanInvoke(true)
    sendChatMessage(chatMessage:ChatMessage){
            this.invokeToAll(chatMessage,"chatMessage",this.alias);
    }
}

