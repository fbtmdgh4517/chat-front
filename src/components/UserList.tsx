import {
    Sidebar,
    Search,
    ConversationList,
    Conversation,
    Avatar
  } from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/User.type";
import { useChatDispatch, useChatSelector } from "../store";
import { setSelectedUser } from "../store/selectedUserSlice";
import { axiosAuth } from "../api/axiosHttp";
import { setUserList } from "../store/userListSlice";

export const UserList = () => {
    const dispatch = useChatDispatch();
    const userListObj = useChatSelector((state:any) => state.userList);
    const user = useChatSelector((state:any) => state.user);

    const selectUser = async (chatUser:any) => {
        const res = await axiosAuth.put('/message-log', {
            cmiSenderUiNum: chatUser.memberNum,
            cmiReceiveUiNum: user.memberNum
        });
        if(res.data) {
            const tmpUserList:any = JSON.parse(JSON.stringify(userListObj.list));
            tmpUserList.map((user:any) => {
                if(user.memberNum === chatUser.memberNum) {
                    user.unreadCnt = 0;
                }
            })
            dispatch(setUserList(tmpUserList));
        }
        dispatch(setSelectedUser(chatUser));
    }

    return (
        <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>
                {userListObj.list ? userListObj.list.map((chatUser:any, idx:number) => (
                    <Conversation
                        key={idx}
                        name={chatUser.memberName}
                        lastSenderName="Lilly"
                        info="Yes i can do it for you"
                        style={{ justifyContent: "start" }}
                        onClick={() => {
                            selectUser(chatUser);
                        }}
                        unreadCnt={chatUser.unreadCnt}
                    >
                        <Avatar
                            src={chatUser.memberImgPath ? `${chatUser.memberImgPath}` : require("./images/profile.png")}
                            name={chatUser.memberName}
                            status={chatUser.login ? "available" : "dnd"}
                        />
                    </Conversation>
                )): ''}
            </ConversationList>
          </Sidebar>
    );
}