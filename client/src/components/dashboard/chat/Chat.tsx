import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import { GET_CHAT_HISTORY } from "../../../gql/chat.graphql";
import { GetChatHistory } from "../../../common/graphqlTypes";
import { useChatSubscription } from "../../../hooks/useChatSubscription";
import { ChatContainer } from "../../ui/Container";
import { inicials } from "../../../common/stringUtil";
import {
  ChatWindowContainer,
  ChatWindowInput,
  ChatSubmitBtn,
  ChatMessageSender,
  ChatMessageContent,
  ChatMessage,
  ChatMessageTime,
} from "../../ui/Chat/style";

export const Chat: React.FC = () => {
  // load chat history
  const { data } = useQuery<GetChatHistory>(GET_CHAT_HISTORY);

  useChatSubscription(data);

  console.log(data?.getChatHistory);

  return (
    <ChatContainer>
      <ChatWindowContainer>
        {data?.getChatHistory.map(({ id, message, senderName, timestamp }) => (
          <ChatMessage key={id}>
            <ChatMessageSender>
              <span>{`${inicials(senderName)}:`}</span>
            </ChatMessageSender>
            <ChatMessageContent>
              <span>{message}</span>
            </ChatMessageContent>
            <ChatMessageTime>
              <span>{format(new Date(timestamp), "HH:mm:ss")}</span>
            </ChatMessageTime>
          </ChatMessage>
        ))}
        <ChatWindowInput />
      </ChatWindowContainer>
      <ChatSubmitBtn />
    </ChatContainer>
  );
};
