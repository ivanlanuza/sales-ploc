import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "POST") {
    if (!req.body.companyId)
      return res
        .status(400)
        .json({ message: "Required parameter amount missing" });

    if (!req.body.actiontypeId)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    if (!req.body.actionData)
      return res
        .status(400)
        .json({ message: "Required parameter user missing" });

    if (!req.body.createdBy)
      return res
        .status(400)
        .json({ message: "Required parameter user missing" });

    if (!req.body.businessDate)
      return res
        .status(400)
        .json({ message: "Required parameter user missing" });

    await prisma.action.create({
      data: {
        companyId: req.body.companyId,
        actiontypeId: req.body.actiontypeId,
        createdBy: req.body.createdBy,
        businessDate: req.body.businessDate,
        ActionData: {
          createMany: {
            data: req.body.actionData,
          },
        },
      },
      include: {
        ActionData: true,
      },
    });

    res.status(200).end();
  }
}
