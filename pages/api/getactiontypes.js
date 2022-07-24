import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method == "GET") {
    const actiontypes = await prisma.actionTypeOnStatus.findMany({
      where: {
        statusId: req.query.id,
      },
      include: {
        actiontype: true,
      },
    });
    //console.log(actiontypes);
    res.status(200).json(actiontypes);
    return;
  }
}
