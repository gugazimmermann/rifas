import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@/utils/prismaClient";
import { loginSchema } from "@/utils/validation";
import { handleRequest } from "@/utils/apiHelpers";
import { verifyPassword } from "@/utils/hash";
import { createToken, createRefreshToken } from "@/utils/jwt";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await handleRequest(req, res, loginSchema, {
    POST: async (parsedData) => {
      const { email, password } = parsedData;

      const user = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!user || !(await verifyPassword(password, user.password))) {
        return res.status(401).json({ error: "Login inválido" });
      }

      const accessToken = await createToken({ userId: user.id }, "1h");
      const refreshToken = await createRefreshToken({ userId: user.id }, "7d");

      res.setHeader("Set-Cookie", [
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 3600,
          path: "/",
        }),
        cookie.serialize("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 604800,
          path: "/",
        }),
      ]);

      res.status(200).json({ user });
    },
  });
}
