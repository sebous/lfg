import { Resolver, Mutation, Arg, PubSub, PubSubEngine, Subscription, Root, Query, Ctx } from "type-graphql";
import { getConnection } from "typeorm";
import { Place } from "../../entity/Place";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { notificationFactory } from "../../common/factories";
import { PlaceNotificationType } from "./types/PlaceNotification";
import { NewPlaceInput } from "./types/NewPlaceInput";
import { User } from "../../entity/User";
import { UpdatePlaceInput } from "./types/UpdatePlaceInput";
import { ServerContext } from "../../types/context";

@Resolver()
export class PlaceResolver {
  // get all places
  @Query(() => [Place])
  async getPlaces(): Promise<Place[]> {
    const places = await Place.find();
    return places;
  }

  @Subscription(() => PlaceNotificationType, {
    topics: [SubscriptionTopic.PLACE],
  })
  placesSubscription(@Root() payload: Notification<Place>): PlaceNotificationType {
    return payload as PlaceNotificationType;
  }

  // add new place
  @Mutation(() => Place)
  async addPlace(
    @Arg("placeInput") { name, description }: NewPlaceInput,
    @Ctx() ctx: ServerContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Place> {
    const user = await User.findOne(ctx.req.session!.userId);
    if (!user) throw Error("invalid user");

    const place = await Place.create({
      name,
      description,
      owner: user,
    }).save();

    const notification = notificationFactory<Place>(place, "ADD");
    await pubSub.publish(SubscriptionTopic.PLACE, notification);
    return place;
  }

  @Mutation(() => Place)
  async joinPlace(
    @Arg("placeId") placeId: string,
    @Ctx() ctx: ServerContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Place | undefined> {
    const place = await Place.findOne(placeId);
    const user = await User.findOne(ctx.req.session!.userId);
    if (!place || !user) return;

    place.joinedUsers.push(user);
    const updatedPlace = await place.save();

    const notification = notificationFactory<Place>(updatedPlace, "UPDATE");
    await pubSub.publish(SubscriptionTopic.PLACE, notification);
    return updatedPlace;
  }

  @Mutation(() => Place)
  async leavePlace(
    @Arg("placeId") placeId: string,
    @Ctx() ctx: ServerContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Place | undefined> {
    const place = await Place.findOne(placeId);
    if (!place) return;

    place.joinedUsers = place.joinedUsers.filter(u => u.id !== ctx.req.session!.userId);
    const updatedPlace = await place.save();

    const notification = notificationFactory<Place>(updatedPlace, "UPDATE");
    await pubSub.publish(SubscriptionTopic.PLACE, notification);
    return updatedPlace;
  }

  // remove place
  @Mutation(() => Boolean)
  async removeOnePlace(
    @Arg("placeId") placeId: string,
    @Ctx() ctx: ServerContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const place = await Place.findOne(placeId);
    if (!place) return false;

    // user can delete only his places
    // TODO: admin can delete others
    if (place.owner.id !== ctx.req.session!.userId) return false;

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
