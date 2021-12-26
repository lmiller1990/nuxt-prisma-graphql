import {
  arg,
  enumType,
  inputObjectType,
  intArg,
  list,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from "nexus";
import fs from "fs";
import { Link, User } from "nexus-prisma";
import path from "path";

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
    t.field(Link.href);
  },
});

export const gqlThemeName = enumType({
  name: 'ThemeName',
  members: ['forest']
})

export const Query = queryType({
  definition(t) {
    t.field("viewer", {
      type: "User",
      resolve: (src, args, ctx) => {
        return ctx.prisma.user.findFirst({
          where: {
            id: ctx.user?.id,
          },
          include: {
            links: true,
          },
        });
      },
    });

    t.field("preview", {
      type: 'String',
      args: {
        theme: nonNull(gqlThemeName)
      },
      resolve: async (src, args, ctx) => {
        const template = fs.readFileSync(path.join(__dirname, '..', `template-${args.theme}`, 'dist', 'index.html'), 'utf-8')
        const user = await ctx.prisma.user.findFirst({
          where: {
            id: ctx.user?.id,
          },
          include: {
            links: true,
          },
        });

        const links = user?.links.map(({ href, text }) => ({ href, text })) || []

        return template.replace(
          '<script data-links></script>', 
          `<script data-links>window.links = '${JSON.stringify(links)}'</script>`, 
        )
      }
    })
  },
});

export const SaveLinkInput = inputObjectType({
  name: "SaveLinkInput",
  definition(t) {
    t.field(Link.id);
    t.field(Link.text);
    t.field(Link.href);
  },
});

export const Mutation = mutationType({
  definition(t) {
    t.field("saveLinks", {
      type: "User",
      args: {
        links: nonNull(list(nonNull(SaveLinkInput))),
      },
      resolve: async (src, args, ctx) => {
        await Promise.all(args.links.map(({ id, ...data }) => {
          return ctx.prisma.link.update({
            where: {
              id,
            },
            data,
          });
        }))

        return ctx.prisma.user.findFirst({
          where: {
            id: ctx.user?.id,
          },
          include: {
            links: true,
          },
        });
      },
    });

    t.field("createLink", {
      args: {
        text: nonNull(stringArg()),
        href: nonNull(stringArg()),
        order: nonNull(intArg()),
      },
      type: "User",
      resolve: async (src, args, ctx) => {
        if (!ctx.user) {
          return null;
        }

        await ctx.prisma.link.create({
          data: {
            userId: ctx.user?.id,
            text: args.text,
            order: args.order,
            href: args.href,
          },
        });

        return ctx.prisma.user.findFirst({
          where: {
            id: ctx.user?.id,
          },
          include: {
            links: true,
          },
        });
      },
    });
  },
});
