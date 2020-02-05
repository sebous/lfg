import {
  Resolver,
  Mutation,
  Arg,
  PubSub,
  PubSubEngine,
  Subscription,
  Root,
} from "type-graphql";
// import { PubSubEngine } from "graphql-subscriptions";
import { Place } from "../../entity/Place";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { notificationFactory } from "../../common/factories";
import { PlaceNotificationType } from "./PlaceNotification";
import { NewPlaceInput } from "./NewPlaceInput";
import { User } from "../../entity/User";
import { getConnection } from "typeorm";
import { UpdatePlaceInput } from "./UpdatePlaceInput";

@Resolver()
export class PlaceResolver {
  // add new place
  @Mutation(() => Place)
  async addPlace(
    @Arg("placeInput") { name, createdById, joinedUsersIds }: NewPlaceInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Place> {
    const user = await User.findOne({ where: { id: createdById } });
    if (!user) throw Error("invalid user");

    const place = await Place.create({
      name,
      joinedUsersIds,
      createdBy: user,
    }).save();

    const notification = notificationFactory<Place>(place);
    await pubSub.publish(SubscriptionTopic.PLACE_ADDED, notification);

    return place;
  }

  // subscribe to place updates
  @Subscription(() => PlaceNotificationType, {
    topics: SubscriptionTopic.PLACE_ADDED,
  })
  placesSubscription(
    @Root() payload: Notification<Place>
  ): PlaceNotificationType {
    return payload as PlaceNotificationType;
  }

  // update joinedUsersIds on Place
  @Mutation(() => Place)
  async updatePlace(
    @Arg("placeInfo") placeInfo: UpdatePlaceInput
  ): Promise<Place | undefined> {
    const place = await Place.findOne(placeInfo.id);
    if (!place) return;

    place.joinedUsersIds = placeInfo.joinedUsersIds;
    return await place.save();
  }

  // remove place
  @Mutation(() => Boolean)
  async removeOnePlace(
    @Arg("placeId") placeId: string,
    @Arg("userId") userId: string
  ): Promise<boolean> {
    const place = await Place.findOne({ where: { id: placeId } });
    if (!place) return false;

    // user can delete only his places
    if (place.createdBy.id !== userId) return false;

    await Place.remove(place);
    return true;
  }

  // clear Place entity table
  @Mutation(() => Boolean)
  async clearPlaces(): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Place)
      .execute();
    return true;
  }
}