import { graphqlHTTP } from "express-graphql";
import express, { NextFunction, Request, Response } from "express";
import { graphqlSchema } from "./schema";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { requiresAuth } from "./jwt";
import { Context } from "./context";
import { s3Client } from "./upload";
import type { Readable } from "stream";

export interface User {
  id: number;
  email: string;
}

export interface Req extends Request {
  prisma?: PrismaClient;
  ctx?: Context;
  user?: User;
}

export const prisma = new PrismaClient({
  log: [],
});

function addPrisma(req: Req, res: Response, next: NextFunction) {
  req.prisma = prisma;
  next();
}

export const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/:username", async (req, res) => {
  const indexHtml = await s3Client.send(
    new GetObjectCommand({
      Bucket: "linktree-dev",
      Key: `${req.params.username}.html`,
    })
  );

  (indexHtml.Body as Readable).pipe(res);
});

app.use(
  "/graphql",
  addPrisma,
  requiresAuth,
  // @ts-ignore
  graphqlHTTP((req: Req, res) => {
    if (!req.user) {
      res.statusCode = 401;
      return res.end();
    }

    console.log(`User: ${req.user.email}`);

    return {
      schema: graphqlSchema,
      graphiql: true,
      context: new Context(req.user),
    };
  })
);
