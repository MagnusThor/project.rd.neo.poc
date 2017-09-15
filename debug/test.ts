import {ThorIOClient} from 'thor-io.client-vnext'
export class TestApp{


        private factory : ThorIOClient.Factory;

        private rdTestProxy: ThorIOClient.Proxy;

        private chatProxy: ThorIOClient.Proxy;


        private showData(data:any){
            let parent = document.querySelector("#debug") as HTMLDivElement;
            
            let el = document.createElement("pre");
            el.textContent = JSON.stringify(data);
            parent.insertBefore(el,parent.firstChild);

        };

        constructor(){
            let serverUrl :string  = location.origin.replace(/^http/, 'ws');
           
        
            this.factory = new ThorIOClient.Factory(serverUrl,["rdtest","chat"]);

            // We got a connection to server 
            this.factory.OnOpen = () => {


                    this.rdTestProxy= this.factory.GetProxy("rdtest");
                    console.log(this.rdTestProxy);
                    this.chatProxy =  this.factory.GetProxy("chat");
                    console.log(this.chatProxy);
                    // connect the Prox

                    this.rdTestProxy.Connect();

                    this.chatProxy.Connect();

                    // When we got a connection ( proxy ) to the controller 
                    this.rdTestProxy.OnOpen = () => {

                            this.rdTestProxy.Subscribe("tempChange", (data:any) =>{
                                this.showData(data);
                            });
                        
                    }

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
                        this.rdTestProxy.Publish("size",temperatue);
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

                   
            };

        }

}


document.addEventListener("DOMContentLoaded", () => {


        let testApp = new TestApp();

        console.log("testApp", testApp);

});