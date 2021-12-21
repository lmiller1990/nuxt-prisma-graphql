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
    t.field(Link.order);
  },
});

export const Query = queryType({
  definition(t) {
    t.field("viewer", {
      type: "User",
      resolve: (src, args, ctx) => {
        console.log('ctx.user', ctx.user)
        return ctx.user ?? null;
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
      },
    });

    t.field('logout', {
      type: 'User',
      resolve: (source, args, ctx) => {
        return ctx.user
      }
    })
  },
});
