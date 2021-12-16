import { PrismaClient } from "@prisma/client";

type Unwrap<T> = T extends Promise<infer V> ? V : T

export class Context {
  prisma = new PrismaClient({
    log: ["query"],
  });
  viewer?: Unwrap<ReturnType<typeof this.prisma.user["findFirst"]>>;
}