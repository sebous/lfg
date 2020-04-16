import { ObjectType } from "type-graphql";
import { NotificationType } from "../../../types/notifications";
import { Place } from "../../../entity/Place";

@ObjectType()
export class PlaceNotificationType extends NotificationType(Place) {}
