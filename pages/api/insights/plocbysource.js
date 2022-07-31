import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  if (req.method === "GET") {
    const segmentFilter = Prisma.sql` AND "Company"."segmentId" = ${req.query.segmentId}`;
    const btFilter = Prisma.sql` AND "Company"."businesstypeId" = ${req.query.businesstypeId}`;

    const orig = await prisma.$queryRaw`SELECT 
    "Source"."name" ,
    "Company"."sourceId",
    "ActionType"."code" ,
    CAST(COUNT(DISTINCT "Action"."companyId") AS INTEGER) 
    FROM "Company"
      INNER JOIN "Source" ON "Company"."sourceId" = "Source"."id"
      INNER JOIN "Action" ON "Company"."id" = "Action"."companyId" 
      INNER JOIN "ActionType" ON "ActionType"."id" = "Action"."actiontypeId" 
    WHERE "actiontypeId" IN ('01','02','03','04')
    ${req.query.segmentId ? segmentFilter : Prisma.empty}
    ${req.query.businesstypeId ? btFilter : Prisma.empty}
    GROUP BY "sourceId", "actiontypeId", "Source"."name", "ActionType"."code" 
    ORDER BY "sourceId", "actiontypeId"`;

    var a = [];
    if (orig.length != 0) {
      var name = "";
      var i, x;
      for (i = 0; i < orig.length; i++) {
        if (orig[i].name != name) {
          if (name != "") {
            a.push(x);
          }
          x = {};
          x["name"] = orig[i].name;
          x["id"] = orig[i].sourceId;
          name = orig[i].name;
        }
        x[orig[i].code] = orig[i].count;
      }
      a.push(x);
    }
    res.status(200).json(a);
    return;
  }
}
