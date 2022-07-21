import prisma from "lib/prisma";
import { getSession } from "next-auth/react";
import { defaultStatus } from "lib/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "POST") {
    if (!req.body.contactName)
      return res
        .status(400)
        .json({ message: "Required parameter amount missing" });

    if (!req.body.companyId)
      return res
        .status(400)
        .json({ message: "Required parameter type missing" });

    await prisma.contactInfo.create({
      data: {
        companyId: req.body.companyId,
        name: req.body.contactName,
        mobile: req.body.contactMobile,
        email: req.body.contactEmail,
        role: req.body.contactRole,
      },
    });

    res.status(200).end();
  }
}
