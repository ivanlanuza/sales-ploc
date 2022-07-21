import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "PUT") {
    if (!req.body.contactName)
      return res
        .status(400)
        .json({ message: "Required parameter amount missing" });

    await prisma.contactInfo.update({
      data: {
        name: req.body.contactName,
        role: req.body.contactRole,
        email: req.body.contactEmail,
        mobile: req.body.contactMobile,
        notes: req.body.contactNotes,
      },
      where: {
        id: req.body.id,
      },
    });

    res.status(200).end();
  }
}
