import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { graphqlSchema } from './schema'
import { PrismaClient } from "@prisma/client";
import { Context } from './context';

export const app = express()

const prisma = new PrismaClient();

app.use(
  "/graphql",
  graphqlHTTP(() => {
    return {
      schema: graphqlSchema,
      graphiql: true,
      context: new Context()
    };
  })
);
