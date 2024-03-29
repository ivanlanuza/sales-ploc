import prisma from "lib/prisma";
import { getSession } from "next-auth/react";
import { defaultStatus, defaultNewProspectSetting } from "lib/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "POST") {
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

    if (!req.body.notime_actionDate)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    await prisma.company.create({
      data: {
        name: req.body.companyName,
        other_name: req.body.otherName,
        segmentId: req.body.segmentSelect,
        sourceId: req.body.sourceSelect,
        businesstypeId: req.body.businesstypeSelect,
        address: req.body.address,
        statusId: defaultStatus,
        userId: req.body.createdBy,
        Action: {
          create: {
            createdBy: req.body.createdBy,
            actiontypeId: defaultNewProspectSetting,
            businessDate: req.body.notime_actionDate,
          },
        },
      },
      include: {
        Action: true,
      },
    });

    res.status(200).end();
  }
}
