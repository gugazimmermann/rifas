import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@/utils/prismaClient";
import { signupSchema } from "@/utils/validation";
import { handleRequest } from "@/utils/apiHelpers";
import { hashPassword } from "@/utils/hash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await handleRequest(req, res, signupSchema, {
    POST: async (parsedData) => {
      if (!parsedData) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

      const {
        email,
        password,
        name,
        phone,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
      } = parsedData;

      const existingUser = await prismaClient.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const hashedPassword = await hashPassword(password);

      const address = await prismaClient.address.create({
        data: {
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          zipCode,
        },
      });

      const user = await prismaClient.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          addressId: address.id,
        },
      });

      res.status(201).json({ message: "Cadastro criado com sucesso" });
    },
  });
}
