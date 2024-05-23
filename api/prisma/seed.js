import { categories } from "./category.js";
import { types } from "./type.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  for (let type of types) {
    await prisma.type.create({
      data: type,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

//npx prisma db seed
