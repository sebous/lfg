import { ObjectType } from "type-graphql";
import { NotificationType } from "../../types/notifications";
import { User } from "../../entity/User";

@ObjectType()
export class UserNotificationType extends NotificationType(User) {}
