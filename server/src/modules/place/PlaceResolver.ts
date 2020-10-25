import {
  Resolver,
  Mutation,
  Arg,
  PubSub,
  PubSubEngine,
  Subscription,
  Root,
  Query,
  Ctx,
  Authorized,
} from "type-graphql";
import { Place } from "../../entity/Place";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { notificationFactory } from "../../common/factories";
import { PlaceNotificationType } from "./types/PlaceNotification";
import { NewPlaceInput } from "./types/NewPlaceInput";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";
import { clearAllPlaces } from "../../common/util/placeUtil";
import * as uploadStorage from "../../common/uploadStorage";

@Resolver()
export class PlaceResolver {
  // get all places
  @Query(() => [Place])
  @Authorized()
  async getPlaces(): Promise<Place[]> {
    const places = await Place.find();
    console.log(places);
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
  @Authorized()
  async addPlace(
    @Arg("placeInput") { name, description, imageUpload }: NewPlaceInput,
    @Ctx() ctx: ServerContext
  ): Promise<Place> {
    const user = await User.findOne(ctx.req.session!.userId);
    if (!user) throw Error("invalid user");

    const extractImage = async () => {
      const img = await imageUpload;
      if (!img) return;

      const fileUrl = await uploadStorage.saveUpload(img);
      return fileUrl;
    };

    const place = await Place.create({
      name,
      description,
      owner: user,
      imageUrl: await extractImage(),
    }).save();
    return place;
  }

  @Mutation(() => Place)
  @Authorized()
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
  @Authorized()
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
  @Authorized()
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
    await clearAllPlaces();
    return true;
  }
}
