import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method == "GET") {
    const companies = await prisma.company.findMany({
      where: {
        segmentId: req.query.segmentId ? req.query.segmentId : undefined,
        businesstypeId: req.query.businesstypeId
          ? req.query.businesstypeId
          : undefined,
        sourceId: req.query.sourceId ? req.query.sourceId : undefined,
        statusId: req.query.statusId ? req.query.statusId : undefined,
        name: req.query.name
          ? {
              contains: req.query.name,
            }
          : undefined,
        isActive: true,
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
      include: {
        segment: true,
        source: true,
        businesstype: true,
        status: true,
        user: true,
      },
      take: req.query.take ? parseInt(req.query.take) : undefined,
    });
    res.status(200).json(companies);
    return;
  }
}
