import cron from "node-cron";
import { clearAllPlaces } from "./util/placeUtil";
import { unqueueAllUsers } from "./util/userUtil";

export function scheduleCronJobs() {
  // every night clear places and removes users from queue
  cron.schedule(
    "0 3 * * *",
    async () => {
      console.log("clearing all places, queued users");
      await clearAllPlaces();
      await unqueueAllUsers();
      console.log("cleared");
    },
    { timezone: "Europe/Prague" }
  );
}
