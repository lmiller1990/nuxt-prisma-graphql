import { makeSchema } from "nexus";
import { join } from "path";
import * as types from './types'

export const graphqlSchema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "nexus-typegen.ts"),
    schema: join(__dirname, "schema.graphql"),
  },
});
