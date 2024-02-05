import { persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import userListReducer from './userListSlice';
import chatListReducer from './chatListSlice';
import enterUserReducer from './enterUserSlice';
import selectedUserReducer from './selectedUserSlice';

const reducers = combineReducers({
    user: userReducer,
    userList: userListReducer,
    enterUser: enterUserReducer,
    selectedUser: selectedUserReducer,
    chatList: chatListReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['user', 'userList']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}),
})

export const useChatDispatch = () => useDispatch();
export const useChatSelector = useSelector;