import { getConnection } from "typeorm";
import { User } from "../../entity/User";

export async function unqueueAllUsers() {
  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ queuing: false })
    .execute();
}
