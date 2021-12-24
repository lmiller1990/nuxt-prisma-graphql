import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { NextFunction, Response } from "express";
import { Req } from "./server";

const cert = fs.readFileSync(
  path.resolve(__dirname, "..", ".auth-cert"),
  "utf-8"
);

const ns = "http://dev-p-8qknej/";

interface VerifiedPayload {
  email: string;
}

function verifyPayload(token: string): VerifiedPayload {
  const payload = jwt.verify(token, cert, {
    algorithms: ["RS256"],
    audience: "https://dev-p-8qknej.us.auth0.com/api/v2/",
  }) as any;

  const emailKey = `${ns}email` 

  if (!payload[emailKey]) {
    throw Error(`Expected ${emailKey} in ${JSON.stringify(payload)}`);
  }

  return {
    email: payload[emailKey].replace(ns, ""),
  };
}

export async function requiresAuth(req: Req, res: Response, next: NextFunction) {
  // Authorization: Bearer jy.....
  const token = req.headers["authorization"]?.slice(7);

  if (!token) {
    return res.status(401).end();
  }

  const payload = verifyPayload(token);

  const user = await req.prisma?.user.findFirst({
    where: {
      email: payload.email,
    },
    include: {
      links: true,
    },
  });

  if (user) {
    req.user = user
    return next()
  }

  const newUser = await req.prisma?.user.create({
    data: {
      email: payload.email,
    },
    include: {
      links: true,
    },
  });

  req.user = newUser
  next()
}
