import { NextApiRequest, NextApiResponse } from "next";
import { ZodSchema, ZodError } from "zod";

type Handler<T> = (
  data: T,
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

type MethodHandlers<T> = {
  GET?: Handler<T>;
  POST?: Handler<T>;
  PUT?: Handler<T>;
  DELETE?: Handler<T>;
};

export async function handleRequest<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  schema: ZodSchema<T> | undefined,
  handlers: MethodHandlers<T>
) {
  const handler = handlers[req.method as keyof MethodHandlers<T>];

  if (handler) {
    try {
      const data = schema ? schema.parse(req.body) : undefined;
      await handler(data as T, req, res);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", Object.keys(handlers));
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
