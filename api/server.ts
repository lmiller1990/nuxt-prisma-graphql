import { graphqlHTTP } from "express-graphql";
import express, { NextFunction, Request, Response } from "express";
import { graphqlSchema } from "./schema";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { requiresAuth } from './jwt'
import { Context } from "./context";

export interface User {
  id: number
  email: string
}

export interface Req extends Request {
  prisma?: PrismaClient
  ctx?: Context
  user?: User
}

export const prisma = new PrismaClient({});

function addPrisma (req: Req, res: Response, next: NextFunction) {
  req.prisma = prisma
  next()
}

export const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(addPrisma)
app.use(requiresAuth)

app.use(
  "/graphql",
  // @ts-ignore
  graphqlHTTP((req: Req, res) => {
    if (!req.user) {
      res.statusCode = 401
      return res.end()
    }

    console.log('user', req.user)

    return {
      schema: graphqlSchema,
      graphiql: true,
      context: new Context(req.user),
    };
  })
);
