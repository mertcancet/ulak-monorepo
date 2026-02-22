import { PrismaPg } from "@prisma/adapter-pg";
import type { User } from "@prisma/browser";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const users: Omit<User, "id">[] = [
  {
    name: "Finn the Human",
    email: "finn@adventuretime.com",
  },
  {
    name: "Jake the Dog",
    email: "jake@adventuretime.com",
  },
  {
    name: "Princess Bubblegum",
    email: "bubblegum@adventuretime.com",
  },
  {
    name: "Marceline the Vampire Queen",
    email: "marceline@adventuretime.com",
  },
  {
    name: "Ice King",
    email: "iceking@adventuretime.com",
  },
];

async function main() {
  console.log("Started seeding...");

  for (const user of users) {
    const result = await prisma.user.create({
      data: user,
    });

    console.log(`Created user: ${JSON.stringify(result)}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
