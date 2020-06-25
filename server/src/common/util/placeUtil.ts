import { getConnection } from "typeorm";
import { Place } from "../../entity/Place";

/**
 * clear all Places and all their relationships
 */
export async function clearAllPlaces() {
  const places = await Place.find();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from("place_joined_users_user")
    .where("placeId IN (:...ids)", { ids: places.map(p => p.id) })
    .execute();

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Place)
    .execute();
}
