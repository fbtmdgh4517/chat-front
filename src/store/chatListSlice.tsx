import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    memberNum: 0,
    list: []
}

const chatListSlice = createSlice({
    name: 'chatList',
    initialState: initialState,
    reducers: {
        setChatList: (state:any, action:any) => {
            state.memberNum = action.payload.memberNum;
            state.list = action.payload.list;
            localStorage.setItem('chatList', JSON.stringify(action.payload));
        },
        initChatList: (state:any) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
});

export const {setChatList, initChatList} = chatListSlice.actions;
export default chatListSlice.reducer;