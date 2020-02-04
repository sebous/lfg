import {
  Resolver,
  Mutation,
  Arg,
  Subscription,
  Args,
  PubSub,
  PubSubEngine,
  Root
} from "type-graphql";
import { Place } from "../../entity/Place";
import { NotificationPayload, Notification } from "../../types/notifications";
import uuid = require("uuid");

export enum SubscriptionTopic {
  PLACE_ADDED = "PLACE_ADDED"
}

@Resolver()
export class PlaceResolver {
  @Mutation(() => Place)
  async addPlace(
    @Arg("name") name: string,
    @Arg("joinedUsersIds", type => [String]) joinedUsersIds: string[],
    @PubSub() pubSub: PubSubEngine
  ): Promise<Place> {
    const place = await Place.create({
      name,
      joinedUsersIds
    }).save();

    // TODO: notify subscribers
    const payload: NotificationPayload = {
      data: JSON.stringify(place)
    };
    await pubSub.publish(SubscriptionTopic.PLACE_ADDED, payload);
    return place;
  }

  @Subscription({
    topics: SubscriptionTopic.PLACE_ADDED,
    filter: ({ payload, args }) => args.priorities.includes(payload.priority)
  })
  sampleNotification(@Root() { data }: NotificationPayload): Notification {
    return {
      id: uuid.v4(),
      date: new Date(),
      data
    };
  }
}
