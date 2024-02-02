import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const brokerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}`;
const initialState = {
    client: {}
}

const clientSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        initClient: (state:any) => {
            state.client = new Client({
                brokerURL: brokerURL,
                debug: (str) => {
                    console.log(str);
                },
                connectHeaders: {
                    memberNum: localStorage.getItem('memberNum') || ''
                },
                onConnect: (frame) => {
                    console.log(frame);
                }
            });
        },
        setSubscribe: (state:any, action) => {
            state.client.onConnect = function() {
                this.subscribe(action.payload.url, action.payload.callback)
            }
            state.client.activate();
        }
    }
});
