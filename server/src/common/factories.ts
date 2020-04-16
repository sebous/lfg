import * as uuid from "uuid";
import _ from "lodash";
import { Notification, Action } from "../types/notifications";

export function notificationFactory<T>(data: T, action: Action): Notification<T> {
  return {
    id: uuid.v4(),
    date: new Date(),
    action,
    data: _.cloneDeep(data),
  };
}
