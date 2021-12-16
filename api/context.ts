import { PrismaClient } from "@prisma/client";

export class Context {
  prisma = new PrismaClient();
}