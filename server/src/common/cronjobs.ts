import cron from "node-cron";
import { clearAllPlaces } from "./util/placeUtil";

export function scheduleCronJobs() {
  // every night clear places and removes users from queue
  cron.schedule("* * 3 * *", async () => {
    await clearAllPlaces();
  });
}
