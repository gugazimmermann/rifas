import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@/utils/prismaClient";
import { hashPassword } from "@/utils/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const { token, password } = req.body;

  const passwordReset = await prismaClient.passwordReset.findUnique({
    where: { token },
  });

  if (!passwordReset || passwordReset.expiresAt < new Date()) {
    return res.status(400).json({ error: "Token inválido ou expirado" });
  }

  const hashedPassword = await hashPassword(password);

  await prismaClient.user.update({
    where: { email: passwordReset.email },
    data: { password: hashedPassword },
  });

  await prismaClient.passwordReset.delete({ where: { token } });

  res.status(200).json({ message: "Senha redefinida com sucesso" });
};
