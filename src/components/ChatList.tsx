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
import { useEffect, useRef, useState } from "react";
import { useChatSelector } from "../store";
import axios from "axios";
import { axiosAuth } from "../api/axiosHttp";
import { Msg } from "../types/Msg.type";
import { publishMsg } from "../service/ChatService";

export const ChatList = () => {
    const [inputMsg, setInputMsg] = useState<string>('');
    const selectedUser = useChatSelector((state:any) => state.selectedUser);
    const loginUser = useChatSelector((state:any) => state.user);
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const page = useRef<number>(1);

    const getChatList = async () => {
      const res = await axiosAuth.get(`/chat-list/${page.current}?cmiSenderUiNum=${selectedUser.memberNum}&cmiReceiveUiNum=${loginUser.memberNum}`);
      setMsgs(res.data.list.reverse());
    }

    const getFormat = (n:number) => {
      return n<10 ? '0'+n : n;
    }

    const days = ['일', '월','화','수','목','금','토']
    const printMessageSeparator = (date1?:any, date2?:any)=>{
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
      const destination = `/publish/chat/${selectedUser.memberNum}`;
      publishMsg(destination, {
        cmiMessage: inputMsg,
        cmiSenderUiNum: loginUser.memberNum,
        cmiReceiveUiNum: selectedUser.memberNum
      });
      setInputMsg('');
    }

    useEffect(() => {
      page.current = 1;
      getChatList();
    }, [selectedUser]);

    return (
        <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={require("./images/profile.png")} name="Zoe" />
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
                msgs.map((msg, idx) => (
                  <>
                    {printMessageSeparator(idx===0 ? null : msgs[idx-1].cmiSentTime, msg.cmiSentTime)}
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
                      <Avatar src={require("./images/profile.png")} name="Zoe" />
                    </Message>
                  </>
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