import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { graphqlSchema } from './schema'

export const app = express()

app.use(
  "/graphql",
  graphqlHTTP(() => {
    return {
      schema: graphqlSchema,
      graphiql: true,
    };
  })
);
