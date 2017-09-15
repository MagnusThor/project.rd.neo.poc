
import {
    ThorIO,
    ControllerProperties,
    CanInvoke,
    CanSet
} from 'thor-io.vnext'

@ControllerProperties("rdtest")
export class TestController extends ThorIO.Controller {
    @CanSet(true)
    size: number;
    constructor(connection: ThorIO.Connection) {
        super(connection);
        this.size = 0; // set size when connected to 0 as default
        // for pub & sub

        // publish a value on the topic "tempChange",
        // pass a random temperatue...



    }

    @CanInvoke(true)
    invokeAndReturn(data: any) {
        // will back what sent to callee
        this.invoke(data, "invokeAndReturn");
    }

    @CanInvoke(true)
    invokeAndSendToAll(data: any) {
        // will send what callee passes to all clients connected to 'test' , see @ControllerProperties
        this.invokeToAll(data, "invokeAndSendToAll");


        let temperatue = {
            temp: 1. + Math.random() * 10
        };

        this.publishToAll(temperatue, "tempChange");
    }

    @CanInvoke(true)
    invokeAndSendOthers(data: any) {
        // will send what callee passes to all clients connected to 'test' except 'self' , see @ControllerProperties
        this.invokeToOthers(data, "invokeAndSendOthers");
    }


    @CanInvoke(true)
    invokeToExpr(data: any) {

        // create an expression, send just to clients 
        // what has an age >= 10;
        let expr = function (pre: TestController) {
            return pre.size >= 10;
        }
        this.invokeTo(expr, data, "invokeToExpr");
    }

}