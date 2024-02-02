import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    memberNum: 0,
    memberName: ''
};

const enterUserSlice = createSlice({
    name: 'enterUser',
    initialState: initialState,
    reducers: {
        setEnterUser: (state:any, action:any) => {
            state.memberNum = action.payload.memberNum;
            state.memberName = action.payload.memberName;
        },
        initUser: (state:any) => {
            state.memberNum = 0;
            state.memberName = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
});

export const {setEnterUser} = enterUserSlice.actions;
export default enterUserSlice.reducer;