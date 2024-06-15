import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@/utils/prismaClient";
import { sendEmail } from "@/utils/nodemailer";
import crypto from "crypto";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  const user = await prismaClient.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: "Usuário não existe" });

  const token = crypto.randomBytes(20).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000);

  await prismaClient.passwordReset.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
    "Redefinição de senha",
    `Você solicitou a redefinição de sua senha. Use o link a seguir para redefinir sua senha: ${resetUrl}`
  );

  res.status(200).json({ message: "Link de confirmação enviado" });
};
