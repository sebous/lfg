import { getConnection } from "typeorm";
import { Place } from "../../entity/Place";
import { removeUpload } from "../uploadStorage";

/**
 * clear all Places and all their relationships
 */
export async function clearAllPlaces() {
  const places = await Place.find();
  if (places.length === 0) return;

  const placesIds = places.map(p => p.id);

  // remove rows from jointable
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from("place_joined_users_user")
    .where("placeId IN (:...ids)", { ids: placesIds })
    .execute();

  // remove attached uploads
  const uploadsToRemove = places.filter(p => p.imageUrl).map(p => p.imageUrl);
  await Promise.all(uploadsToRemove.map(async fileName => removeUpload(fileName!)));

  // remove places
  await Place.delete(placesIds);
}
