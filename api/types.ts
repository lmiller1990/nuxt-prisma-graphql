import { mutationType, nonNull, objectType, stringArg } from 'nexus'

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.nonNull.list.nonNull.field("Link", {
      type: Link,
    });
  },
});

export const Link = objectType({
  name: 'Link',
  definition (t) {
    t.id('id')
    t.nonNull.string('text')
    t.nonNull.int('order')
  }
})

export const Query = objectType({
  name: 'Query',
  definition (t) {
    t.nonNull.field('viewer', {
      type: User,
      resolve: (src, args, ctx) => {
        return {
        }
      }
    })
  }
})

export const Mutation = mutationType({
  definition(t) {
    t.field('authenticate', {
      type: 'User',
      args: {
        email: nonNull(stringArg())
      },
      resolve: async (source, args, ctx) => {
        const user = await ctx.prisma.user.findFirst({
          where: {
            email: args.email
          }
        })
        
        if (user) {
          return user
        }

        ctx.prisma.user.create({
          data: {
            email: args.email
          }  
        })
      }
    })
  }
})