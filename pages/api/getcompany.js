import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method == "GET") {
    const company = await prisma.company.findUnique({
      where: {
        id: req.query.id,
      },
      include: {
        segment: true,
        source: true,
        businesstype: true,
        status: true,
      },
    });
    res.status(200).json(company);
    return;
  }
}
