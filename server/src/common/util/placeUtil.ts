import { getConnection } from "typeorm";
import { Place } from "../../entity/Place";
import { removeUpload } from "../uploadStorage";

/**
 * clear all Places and all their relationships
 */
export async function clearAllPlaces() {
  const places = await Place.find();
  const placesIds = places.map(p => p.id);
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from("place_joined_users_user")
    .where("placeId IN (:...ids)", { ids: placesIds })
    .execute();

  const uploadsToRemove = places.filter(p => p.imageUrl).map(p => p.imageUrl);
  await Promise.all(uploadsToRemove.map(async fileName => removeUpload(fileName!)));

  await Place.delete(placesIds);
}
