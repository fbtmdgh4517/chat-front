import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    VoiceCallButton,
    Message,
    MessageInput,
    VideoCallButton,
    InfoButton,
    MessageSeparator,
    TypingIndicator,
    MessageList
  } from "@chatscope/chat-ui-kit-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useChatDispatch, useChatSelector } from "../store";
import axios from "axios";
import { axiosAuth } from "../api/axiosHttp";
import { Msg } from "../types/Msg.type";
import { publishMsg } from "../service/ChatService";
import { setChatList } from "../store/chatListSlice";

export const ChatList = () => {
    const [inputMsg, setInputMsg] = useState<string>('');
    const selectedUser = useChatSelector((state:any) => state.selectedUser);
    const loginUser = useChatSelector((state:any) => state.user);
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const page = useRef<number>(1);
    
    const chatList = useChatSelector((state:any) => state.chatList);
    const dispatch = useChatDispatch();

    const getChatList = async (init:boolean) => {
      if(!selectedUser.memberNum) return;
      try {
        const res = await axiosAuth.get(`/chat-list/${page.current}?cmiSenderUiNum=${selectedUser.memberNum}&cmiReceiveUiNum=${loginUser.memberNum}`);
        const tmpMsgs = res.data.list;
        tmpMsgs.sort((m1:any,m2:any)=>{
          return m1.cmiSentTime.localeCompare(m2.cmiSentTime);
        });
        if(init){
          const chatInfo:any = {
            memberNum : selectedUser.memberNum,
            list: tmpMsgs
          }
          dispatch(setChatList(chatInfo));
        }else{
          // setMsgs([...tmpMsgs,msgs]);
          console.log('tmpMsgs=>', tmpMsgs);
          const chatInfo:any = {
            memberNum : selectedUser.memberNum,
            list: tmpMsgs
          }
          dispatch(setChatList(chatInfo));
        }
      } catch(e) {
        console.log(e)
      }
    }

    const getFormat = (n:number) => {
      return n<10 ? '0'+n : n;
    }

    const days = ['일', '월','화','수','목','금','토']
    const printMessageSeparator = (date1?:any, date2?:any)=>{
      // console.log(date1);
      // console.log(date2);
      const d2 = new Date(date2);
      const d2Str = `${d2.getFullYear()}-${getFormat(d2.getMonth()+1)}-${getFormat(d2.getDate())}`;
      if(!date1){
        return <MessageSeparator content={`${d2Str} (${days[d2.getDay()]})`}/>
      }

      const d1 = new Date(date1);
      const d1Str = `${d1.getFullYear()}-${getFormat(d1.getMonth()+1)}-${getFormat(d1.getDate())}`;
      if(d1Str!==d2Str){
        return <MessageSeparator content={`${d2Str} (${days[d2.getDay()]})`}/>
      }
    }

    const sendMsg = () => {
      console.log(inputMsg);
      const msg = {
        cmiMessage: inputMsg,
        cmiSenderUiNum: loginUser.memberNum,
        cmiReceiveUiNum: selectedUser.memberNum
      };
      const destination = `/publish/chat/${selectedUser.memberNum}`;

      publishMsg(destination, msg);

      setInputMsg('');
      getChatList(false);
    }

    useEffect(() => {
      page.current = 1;
      getChatList(true);
      console.log('selectedUser=>', selectedUser);
      console.log('loginUser=>', loginUser);
    }, [selectedUser]);

    return (
        <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar 
                src={selectedUser.memberImgPath ? `${selectedUser.memberImgPath}` : require("./images/profile.png")} 
                name="Zoe" />
              <ConversationHeader.Content
                userName={selectedUser.memberName}
                info={selectedUser.loginDate}
              />
              <ConversationHeader.Actions>
                {/* <VoiceCallButton />
                <VideoCallButton />
                <InfoButton /> */}
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>

              {
                selectedUser.memberNum !== 0 && chatList.list.map((msg:Msg, idx:number) => (
                  <Fragment key={idx}>
                    {printMessageSeparator(idx===0 ? null : chatList.list[idx-1].cmiSentTime, msg.cmiSentTime)}
                    <Message
                      key={idx}
                      model={{
                        message: msg.cmiMessage,
                        sentTime: msg.cmiSentTime,
                        sender: msg.cmiSender,
                        direction: msg.cmiReceiveUiNum === loginUser.memberNum ? "incoming" : 'outgoing',
                        position: "single"
                      }}
                    >
                      <Avatar src={
                        msg.cmiReceiveUiNum === loginUser.memberNum && selectedUser.memberImgPath ?
                        `${selectedUser.memberImgPath}`
                        : msg.cmiSenderUiNum === loginUser.memberNum && loginUser.memberImgPath ? 
                        `${loginUser.memberImgPath}` 
                        : 
                        require("./images/profile.png")} name="Zoe" />
                    </Message>
                  </Fragment>
                ))
              }

            </MessageList>

            <MessageInput
              placeholder="Type message here"
              value={inputMsg}
              onChange={(val) => setInputMsg(val)}
              onSend={sendMsg}
              sendDisabled={false}
            />
          </ChatContainer>
    )
}