// import { PrismaClient } from "@prisma/client";

import { User, prisma } from "./server"

// type Unwrap<T> = T extends Promise<infer V> ? V : T

// export class Context {
//   prisma = new PrismaClient({
//     // log: ["query"],
//   });
//   viewer?: Unwrap<ReturnType<typeof this.prisma.user["findFirst"]>>;
// }

export class Context {
  user?: User

  constructor(user: User) {
    this.user = user
  }

  get prisma () {
    return prisma
  }
}

