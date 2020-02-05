import { Notification } from "../types/notifications";
import uuid = require("uuid");

export function notificationFactory<T>(data: T): Notification<T> {
  return {
    id: uuid.v4(),
    date: new Date(),
    data,
  };
}
