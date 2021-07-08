import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTodosByPage } from "../../../utils/prismaHelpers";
import { Todo } from "@prisma/client";

interface Query {
  page_id?: string;
  user_id?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { page_id, user_id }: Query = req.query;

  if (method === "GET") {
    const todos: Todo[] = await getAllTodosByPage(page_id, user_id);
    res.status(200).json(todos);
  }
}
