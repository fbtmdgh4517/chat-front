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

export const UserList = () => {
    const dispatch = useChatDispatch();
    const tmpUsers = useChatSelector((state:any) => state.userList);
    const [users, setUsers] = useState<User[]>([]);
    const loginUser = useChatSelector((state:any) => state.user);
    
    useEffect(() => {
        setUsers(tmpUsers.list);
    }, [tmpUsers]);
    
    return (
        <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>
                {users ? users.map((chatUser:any, idx) => (
                    <Conversation
                        key={idx}
                        name={chatUser.memberName}
                        lastSenderName="Lilly"
                        info="Yes i can do it for you"
                        style={{ justifyContent: "start" }}
                        onClick={() => {
                            dispatch(setSelectedUser(chatUser))
                        }}
                    >
                        <Avatar
                            src={require("./images/profile.png")}
                            name={chatUser.memberName}
                            status={chatUser.login ? "available" : "dnd"}
                        />
                    </Conversation>
                )): ''}

                <Conversation
                    name="Joe"
                    lastSenderName="Joe"
                    info="Yes i can do it for you"
                >
                    <Avatar
                    src={require("./images/profile.png")}
                    name="Joe"
                    status="dnd"
                    />
                </Conversation>

                <Conversation
                    name="Emily"
                    lastSenderName="Emily"
                    info="Yes i can do it for you"
                    unreadCnt={3}
                >
                    <Avatar
                    src={require("./images/profile.png")}
                    name="Emily"
                    status="available"
                    />
                </Conversation>

                <Conversation
                    name="Kai"
                    lastSenderName="Kai"
                    info="Yes i can do it for you"
                    unreadDot
                >
                    <Avatar
                    src={require("./images/profile.png")}
                    name="Kai"
                    status="unavailable"
                    />
                </Conversation>
            </ConversationList>
          </Sidebar>
    );
}