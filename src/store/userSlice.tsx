import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";
import { PURGE } from "redux-persist";

const initialState:User = {
    memberNum: 0,
	memberId: '',
	memberPassword: '',
	memberName: '',
	memberPhone: '',
	memberEmail: '',
	memberAddress: '',
	memberRole: '',
	memberImgPath: '',
	credat: '',
	lmodat: '',
	active: '',
	login: false,
	sessionId: '',
	loginDate: '',
    token: '',
    authorities: []
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state:User, action:any) => {
            state.memberNum = action.payload.memberNum;
            state.memberId = action.payload.memberId;
            state.memberName = action.payload.memberName;
            state.memberAddress = action.payload.memberAddress;
            state.memberEmail = action.payload.memberEmail;
            state.memberPhone = action.payload.memberPhone;
            state.memberRole = action.payload.memberRole;
            state.memberImgPath = action.payload.memberImgPath;
            state.token = action.payload.token;
            state.authorities = action.payload.authorities;
        },
        initUser: (state:User) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const {setUser, initUser} = userSlice.actions;
export default userSlice.reducer;