import type { cleonApi } from "@cleon/api";
import { treaty } from "@elysiajs/eden";

const cleonClient = treaty<cleonApi>("localhost:3000");

// TODO: Bunları sil. Örnek

// const businesses = await cleonClient["knowledge-base"]
//   .businesses({
//     businessId: "heywolrd",
//   })
//   .get();

// await cleonClient["knowledge-base"]
//   .businesses({
//     businessId: "heywolrd",
//   })
//   .delete();

export default cleonClient;
