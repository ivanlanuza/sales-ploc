import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "PUT") {
    if (!req.body.businessDate)
      return res
        .status(400)
        .json({ message: "Required parameter amount missing" });

    if (!req.body.id)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    await prisma.action.update({
      data: {
        businessDate: req.body.businessDate,
      },
      where: {
        id: req.body.id,
      },
    });

    res.status(200).end();
  }
}
