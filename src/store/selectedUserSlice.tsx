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
    authorities: [],
    unreadCnt: 0
};

const selectedUserSlice = createSlice({
    name: 'selectedUser',
    initialState: initialState,
    reducers: {
        setSelectedUser: (state:User, action:any) => {
            state.memberNum = action.payload.memberNum;
            state.memberId = action.payload.memberId;
            state.memberName = action.payload.memberName;
            state.memberAddress = action.payload.memberAddress;
            state.memberEmail = action.payload.memberEmail;
            state.memberPhone = action.payload.memberPhone;
            state.memberRole = action.payload.memberRole;
            state.memberImgPath = action.payload.memberImgPath;
            state.loginDate = action.payload.loginDate;
            state.token = action.payload.token;
            state.authorities = action.payload.authorities;
            state.unreadCnt = action.payload.unreadCnt;
            localStorage.setItem('selectedUser', JSON.stringify(action.payload));
        },
        initUser: (state:User) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const {setSelectedUser} = selectedUserSlice.actions;
export default selectedUserSlice.reducer;