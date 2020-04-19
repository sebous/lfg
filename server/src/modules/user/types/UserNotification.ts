import { ObjectType } from "type-graphql";
import { User } from "../../../entity/User";
import { NotificationType } from "../../../types/notifications";

@ObjectType()
export class UserNotificationType extends NotificationType(User) {}
