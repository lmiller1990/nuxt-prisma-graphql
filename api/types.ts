import { objectType } from 'nexus'

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