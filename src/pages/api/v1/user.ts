import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";
import {
  prisma_createUser,
  prisma_deleteUserbyuserid,
  prisma_deleteUserbyusername,
  prisma_getUserByUserid
} from "../../../utils/prismaHelpers";

import { User_Request_Body } from "../../../constants/Types";

interface Query {
  user_id?: string;
  user_username?: string;
}

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { user_id, user_username }: Query = req.query;

  switch (method) {
    case "GET":
      if (user_id) {
        const requested_user: User = await prisma_getUserByUserid(user_id);

        res.status(200).json(JSON.stringify(requested_user));
      }

      break;
    case "POST":
      try {
        const body: User_Request_Body = req.body;

        const createdUser: User = await prisma_createUser(body);

        res.status(201).json(JSON.stringify(createdUser));
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(JSON.stringify(e.message));
        }
      }
      break;
    case "DELETE":
      if (user_id) {
        const deletedUser: User = await prisma_deleteUserbyuserid(user_id);

        res.status(200).json(JSON.stringify(deletedUser));
      } else if (user_username) {
        const deletedUser: User = await prisma_deleteUserbyusername(
          user_username
        );

        res.status(200).json(JSON.stringify(deletedUser));
      }
      break;
  }
}
