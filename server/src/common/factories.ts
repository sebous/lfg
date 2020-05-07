import * as uuid from "uuid";
import _ from "lodash";
import { Notification, Action } from "../types/notifications";
import { ChatMessage } from "../types/chat";

export function notificationFactory<T>(data: T, action: Action): Notification<T> {
  return {
    id: uuid.v4(),
    date: new Date(),
    action,
    data: _.cloneDeep(data),
  };
}

export function chatMessageFactory(message: string, senderName: string): ChatMessage {
  return {
    id: uuid.v4(),
    timestamp: new Date().toISOString(),
    senderName,
    message,
  };
}
