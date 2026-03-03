// import { drizzle } from "drizzle-orm/node-postgres";
// import env from "~/shared/env";
// import { users } from "./schema";
import auth from "~/lib/auth";

// const db = drizzle(env.DATABASE_URL);

async function main() {
  console.log("Seed started..");

  await Promise.all([
    auth.api.signUpEmail({
      body: {
        email: "finn@oo.kingdom",
        password: "HeroOfOoo123!",
        name: "Finn the Human",
        image:
          "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/f/f3/Original_Finn.png",
      },
    }),
    auth.api.signUpEmail({
      body: {
        email: "jake@oo.kingdom",
        password: "StretchyDog123!",
        name: "Jake the Dog",
        image:
          "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png",
      },
    }),
    auth.api.signUpEmail({
      body: {
        email: "princess.bubblegum@candy.kingdom",
        password: "SciencePrincess123!",
        name: "Princess Bubblegum",
        image:
          "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/0/00/Princess_Bubblegum.png",
      },
    }),
    auth.api.signUpEmail({
      body: {
        email: "marceline@nightosphere.demon",
        password: "VampireQueen123!",
        name: "Marceline",
        image:
          "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/61/F%26C_S1E7_The_Star_2.jpg",
      },
    }),
    auth.api.signUpEmail({
      body: {
        email: "iceking@ice.kingdom",
        password: "GuntherLover123!",
        name: "Ice King",
        image:
          "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/64/Original_Ice_King.png",
      },
    }),
    auth.api.signUpEmail({
      body: {
        email: "bmo@mo.co",
        password: "LivingConsole123!",
        name: "BMO",
        image:
          "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/8/81/BMO.png",
      },
    }),
  ]);

  console.log("Seed finished.");
}

main();
