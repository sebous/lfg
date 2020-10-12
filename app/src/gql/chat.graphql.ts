import { gql } from "@apollo/client";

export const GET_CHAT_HISTORY = gql`
  query GetChatHistory {
    getChatHistory {
      id
      timestamp
      senderName
      message
    }
  }
`;

export const SEND_CHAT_MESSAGE = gql`
  mutation SendChatMessage($message: String!) {
    sendChatMessage(message: $message)
  }
`;

export const CHAT_SUBSCRIPTION = gql`
  subscription ChatSubscription {
    chatSubscription {
      id
      timestamp
      senderName
      message
    }
  }
`;
