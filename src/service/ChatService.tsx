import { Client } from "@stomp/stompjs";
import { Msg } from "../types/Msg.type";

const brokerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/chat`;

const client = new Client({
    brokerURL: brokerURL,
    debug: (str) => {
        console.log(str);
    },
    reconnectDelay:1000,
    connectionTimeout:100
});

export const initClient = async (configs:any[]) => {
    return new Promise((resolve, reject) => {
        if(!localStorage.getItem('memberNum') || !localStorage.getItem('token')) {
            reject('login');
        }
        client.connectHeaders = {
            memberNum: localStorage.getItem('memberNum') || '',
            token: localStorage.getItem('token') || ''
        };
        // actovate 하고 나서 연결이 되면 얘를 실행함
        client.onConnect = () => {
            for(const config of configs) {
                client.subscribe(config.url, config.callback);
            }
            resolve(client);
        }
        client.activate();
    })
}

export const disconnectClient = () => {
    if(client.connected) {
        client.deactivate();
    }
}

export const publishMsg = (destination:string, msg:Msg) => {
    client.publish({
        destination: destination,
        body: JSON.stringify(msg)
    })
}