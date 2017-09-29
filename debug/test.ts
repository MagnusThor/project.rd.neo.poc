import {ThorIOClient} from 'thor-io.client-vnext'

class Vector3 {
    z: number;
    y: number;
    x: number;
    constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
    }
    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);;
    }

    normalize(){
        let lengthval = this.length();
        
                    if (lengthval != 0) {
                        this.x /= lengthval;
                        this.y /= lengthval;
                        this.z /= lengthval;
                        return true;
                    } else {
                        return false;
                    }
    }
    angle(vectorB:Vector3){
            var anorm = new Vector3(this.x, this.y, this.z);
            anorm.normalize();
            var bnorm = new Vector3(vectorB.x,vectorB.y,vectorB.z);
            bnorm.normalize();
            let dot = anorm.dot(bnorm);
            return Math.acos(dot);
    }

    cross(vectorB:Vector3) {
        var tempvec = new Vector3(this.x, this.y, this.z);
        tempvec.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tempvec.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tempvec.z = (this.x * vectorB.y) - (this.y * vectorB.x);
        this.x = tempvec.x;
        this.y = tempvec.y;
        this.z = tempvec.z;
     
    }

    dot(b:Vector3){
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }
  
}

 interface INetworkMessageEvent{
   
}

 class NetworkEventMessage<T> implements INetworkMessageEvent{
        value: T;
        ts: Number
        constructor(data:T ){
            this.value = data;
            this.ts = performance.now();
        }

}

export class TestApp {


        private factory : ThorIOClient.Factory;

        private rdTestProxy: ThorIOClient.Proxy;

        private chatProxy: ThorIOClient.Proxy;


        private rocketController: ThorIOClient.Proxy;


        private showData(data:any){
            let parent = document.querySelector("#debug") as HTMLDivElement;
            
            let el = document.createElement("pre");
            el.textContent = JSON.stringify(data);
            parent.insertBefore(el,parent.firstChild);

        };

        constructor(){
            let serverUrl :string  = location.origin.replace(/^http/, 'ws');
           
        
            this.factory = new ThorIOClient.Factory(serverUrl,["rdtest","rocketGame","chat"]);

            // We got a connection to server 
            this.factory.OnOpen = () => {

                    this.rdTestProxy= this.factory.GetProxy("rdtest");
                    console.log(this.rdTestProxy);
                    this.chatProxy =  this.factory.GetProxy("chat");
                    console.log(this.chatProxy);
                    this.rocketController = this.factory.GetProxy("rocketGame");
                
                    console.log(this.rocketController);


                    // connect the Prox

                    
                    // When we got a connection ( proxy ) to the controller 
                    this.rdTestProxy.OnOpen = () => {

                            this.rdTestProxy.Subscribe("tempChange", (data:any) =>{
                                this.showData(data);
                            });

                            this.chatProxy.Invoke("changeGroup","lobby");
                            
                            this.chatProxy.Invoke("changeNickName","Marlon Brando");
                    }


                 

                    this.rocketController.OnOpen = () => {

                        this.rocketController.On("onRocketMove", ( (move:NetworkEventMessage<Vector3> ) => {
                            this.showData(move);
                        }));

                     
                    };

                
                    // set up listeners 
            
                    this.rdTestProxy.On("invokeAndReturn", (data:any) =>  { this.showData(data);});
                    this.rdTestProxy.On("invokeAndSendToAll", (data:any) =>  { this.showData(data);});
                    this.rdTestProxy.On("invokeAndSendOthers", (data:any) =>  { this.showData(data);});
                    this.rdTestProxy.On("invokeToExpr", (data:any) =>  { this.showData(data);});

                    this.chatProxy.On("chatMessage", (data:any) => { this.showData(data)});

                    // add event listeners for the UI and Invokes...

                    document.querySelector("#btn-invoke").addEventListener("click", (e:any) => {
                    
                        this.rdTestProxy.Invoke("invokeAndReturn",{
                                text: "invokeAndReturn called",
                                num: 1+Math.random()*10,
                        });

                    });

                    document.querySelector("#btn-invokeAll").addEventListener("click", (e:any) => {
                        this.rdTestProxy.Invoke("invokeAndSendToAll",{
                            text: "invokeAndSendToAll called",
                            num: 1+Math.random()*10,
                    });
                    });

                    document.querySelector("#btn-invokeOthers").addEventListener("click", (e:any) => {
                        this.rdTestProxy.Invoke("invokeAndSendOthers",{
                            text: "invokeAndSendOthers",
                            num: 1+Math.random()*10,
                    });
                    });
                    document.querySelector("#btn-invokeTo").addEventListener("click", (e:any) => {
                        this.rdTestProxy.Invoke("invokeToExpr",{
                            text: "invokeToExpr called",
                            num: 1+Math.random()*10,
                    });
                    });

                    document.querySelector("#btn-setProperty").addEventListener("click", (e:any) => {
                        this.rdTestProxy.SetProperty("size",11);
                    });

                    document.querySelector("#btn-publishTemp").addEventListener("click", (e:any) => {
                       
                        let temperatue = {
                         temp: 1. + Math.random() * 10
                        };
                        this.rdTestProxy.Publish("publishTemperature",temperatue);
                    });


                    document.querySelector("#btn-rocketmove").addEventListener("click",(e:any) => {

                        setInterval( () => {
                            
                                                    
                                                        let vec3 = new Vector3(Math.random(),Math.random(),Math.random());
                            
                                                        let msg = new NetworkEventMessage<Vector3>(vec3);
                            
                                                        this.rocketController.Invoke("moveRocket",msg)
                            
                            
                                                    },100);
                            
                    });

                    document.querySelector("#chat-message").addEventListener("keyup",
                      
                        (evt:KeyboardEvent) => {
                            let el = evt.target as HTMLInputElement;

                                    if(evt.keyCode === 13){

                                        this.chatProxy.Invoke("sendChatMessage",
                                        {
                                            message: el.value
                                        });

                                        el.value = "";

                                    }
                        });

                        
                        console.log("...connect");

                        
                   
                    
                        this.rdTestProxy.Connect();
                        
                        this.chatProxy.Connect();

                        this.rocketController.Connect();
                   
            };

        }

}


document.addEventListener("DOMContentLoaded", () => {


        let testApp = new TestApp();

        console.log("testApp", testApp);

});