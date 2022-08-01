import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "PUT") {
    if (!req.body.companyid)
      return res
        .status(400)
        .json({ message: "Required parameter amount missing" });

    if (!req.body.nextstatus)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    await prisma.company.update({
      data: {
        statusId: req.body.nextstatus,
      },
      where: {
        id: req.body.companyid,
      },
    });

    const status = await prisma.status.findUnique({
      where: {
        id: req.body.nextstatus,
      },
    });

    await prisma.action.create({
      data: {
        companyId: req.body.companyid,
        actiontypeId: status.nextActionId,
        createdBy: req.body.createdBy,
        businessDate: req.body.businessDate,
      },
    });

    //nextActionId

    res.status(200).end();
  }
}
