import type { NextApiRequest, NextApiResponse } from "next";
import { handleRequest } from "@/utils/apiHelpers";

const posts = [
  {
    number: 1,
    name: "Whatsapp",
    title:
      "Crie um BOT para automatizar suas rifas, grupo, e escolha dos números",
  },
  {
    number: 2,
    name: "Pix",
    title:
      "Atomatize os pagamentos com envio automático de código PIX com o valor dos números, e o sistema valida os recebimentos.",
  },
  {
    number: 3,
    name: "Sorteio",
    title:
      "Os sorteios são efetuados automaticamente pelo resultado da loteria selecionada, e os vencedores informados!",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await handleRequest(req, res, undefined, {
    GET: async (_, req, res) => {
      res.status(200).json(posts);
    },
  });
}
