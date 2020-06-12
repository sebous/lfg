import { useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/react-hooks";
import { GetChatHistory, ChatSubscription } from "../common/graphqlTypes";
import { CHAT_SUBSCRIPTION, GET_CHAT_HISTORY } from "../gql/chat.graphql";

export const useChatSubscription = (data: GetChatHistory | undefined) => {
  const client = useApolloClient();
  const { data: newChatMessage } = useSubscription<ChatSubscription>(CHAT_SUBSCRIPTION);

  useEffect(() => {
    if (!newChatMessage) return;
    if (data?.getChatHistory?.some(msg => msg.id === newChatMessage.chatSubscription.id)) return;
    const message = newChatMessage.chatSubscription;

    const localHistory = data?.getChatHistory ?? [];
    const query = GET_CHAT_HISTORY;

    client.writeQuery<GetChatHistory>({ query, data: { getChatHistory: [...localHistory, message] } });
  }, [newChatMessage, client, data]);
};
