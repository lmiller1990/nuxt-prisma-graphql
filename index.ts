import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const theme = await prisma.theme.create({
    data: {
      name: 'default',
      priceUsd: 1,
      backgroundCss: ''
    }
  })

  await prisma.user.create({
    data: {
      username: 'lachlan',
      email: 'blah@blah.com',
      password: 'hashed_password',
      theme: {
        connect: {
          id: theme.id
        }
      }
    }
  })

  const users = await prisma.user.findMany({
    include: {
      theme: true
    }
  })

  console.log(users)
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
