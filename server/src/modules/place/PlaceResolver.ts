import { Resolver, Mutation, Arg, PubSub, PubSubEngine, Subscription, Root, Query } from "type-graphql";
import { getConnection } from "typeorm";
import { Place } from "../../entity/Place";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { notificationFactory } from "../../common/factories";
import { PlaceNotificationType } from "./PlaceNotification";
import { NewPlaceInput } from "./NewPlaceInput";
import { User } from "../../entity/User";
import { UpdatePlaceInput } from "./UpdatePlaceInput";

@Resolver()
export class PlaceResolver {
  // get all places
  @Query(() => [Place])
  async getPlaces(): Promise<Place[]> {
    const places = await Place.find({
      relations: ["createdBy", "createdBy.places"],
    });
    return places;
  }

  // TODO: notifications implementation
  @Subscription(() => PlaceNotificationType, {
    topics: [SubscriptionTopic.PLACE],
  })
  placesSubscription(@Root() payload: Notification<Place>): PlaceNotificationType {
    return payload as PlaceNotificationType;
  }

  // @Subscription(() => Place, { topics: [SubscriptionTopic.PLACE_ADDED, SubscriptionTopic.PLACE_UPDATED] })
  // placesSubscription(@Root() payload: Place): Place {
  //   return payload;
  // }

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

    const notification = notificationFactory<Place>(place, "ADD");
    await pubSub.publish(SubscriptionTopic.PLACE, notification);
    return place;
  }

  // update joinedUsersIds on Place
  @Mutation(() => Place)
  async updatePlace(
    @Arg("placeInfo") placeInfo: UpdatePlaceInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Place | undefined> {
    const place = await Place.findOne(placeInfo.id, {
      relations: ["createdBy", "createdBy.places"],
    });
    if (!place) return;

    place.joinedUsersIds = placeInfo.joinedUsersIds;
    const updatedPlace = await place.save();

    const notification = notificationFactory<Place>(updatedPlace, "UPDATE");
    await pubSub.publish(SubscriptionTopic.PLACE, notification);
    return updatedPlace;
  }

  // remove place
  @Mutation(() => Boolean)
  async removeOnePlace(
    @Arg("placeId") placeId: string,
    @Arg("userId") userId: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const place = await Place.findOne({ where: { id: placeId } });
    if (!place) return false;

    // user can delete only his places
    if (place.createdBy.id !== userId) return false;

    const notification = notificationFactory<Place>(place, "DELETE");
    await Place.remove(place);
    await pubSub.publish(SubscriptionTopic.PLACE, notification);
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
