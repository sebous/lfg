import cron from "node-cron";
import { clearAllPlaces } from "./util/placeUtil";

export function scheduleCronJobs() {
  // every night clear places and removes users from queue
  cron.schedule(
    "0 3 * * *",
    async () => {
      console.log("clearing all places");
      await clearAllPlaces();
      console.log("cleared");
    },
    { timezone: "Europe/Prague" }
  );
}
