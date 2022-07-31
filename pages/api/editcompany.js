import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "PUT") {
    if (!req.body.companyName)
      return res
        .status(400)
        .json({ message: "Required parameter amount missing" });

    if (!req.body.otherName)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    if (!req.body.segmentSelect)
      return res
        .status(400)
        .json({ message: "Required parameter user missing" });

    if (!req.body.businesstypeSelect)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    if (!req.body.sourceSelect)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    await prisma.company.update({
      data: {
        name: req.body.companyName,
        other_name: req.body.otherName,
        segmentId: req.body.segmentSelect,
        sourceId: req.body.sourceSelect,
        businesstypeId: req.body.businesstypeSelect,
        address: req.body.address,
      },
      where: {
        id: req.body.id,
      },
    });

    res.status(200).end();
  }
}
