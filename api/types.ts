import { mutationType, nonNull, objectType, queryType, stringArg } from "nexus";
import { Link, User } from "nexus-prisma";

export const gqlUser = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.links);
    t.field(User.username);
  },
});

export const gqlLink = objectType({
  name: Link.$name,
  description: Link.$description,
  definition(t) {
    t.field(Link.id);
    t.field(Link.text);
  },
});

export const Query = queryType({
  definition(t) {
    t.field("viewer", {
      type: "User",
      resolve: (src, args, ctx) => {
        return ctx.viewer ?? null;
      },
    });
  },
});

export const Mutation = mutationType({
  definition(t) {
    t.field("authenticate", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (source, args, ctx) => {
        const user = await ctx.prisma.user.findFirst({
          where: {
            email: args.email,
          },
          include: {
            links: true,
          },
        });

        if (user) {
          ctx.viewer = user;
          return ctx.viewer;
        }

        ctx.viewer = await ctx.prisma.user.create({
          data: {
            email: args.email,
          },
          include: {
            links: true,
          },
        });

        return ctx.viewer;
      },
    });
  },
});
