import { treaty } from "@elysiajs/eden";
import type { UlakApi } from "@ulak/api";

const cleonClient = treaty<UlakApi>("localhost:3000");

// TODO: Bunları sil. Örnek

// const businesses = await cleonClient["knowledge-base"]
//   .businesses({
//     businessId: "heywolrd",
//   })
//   .get();

// await ulakClient["knowledge-base"]
//   .businesses({
//     businessId: "heywolrd",
//   })
//   .delete();

export default cleonClient;
