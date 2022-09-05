import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";

//import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  //const session = await getSession({ req });

  //if (!session) return res.status(401).json({ message: "Not logged in" });
  var mygrouping = req.query.groupbyfilter;

  if (req.method === "GET" && mygrouping === "alldata") {
    const data =
      await prisma.$queryRaw`SELECT DISTINCT(Company.name), Company.id
    FROM Company
    INNER JOIN Action ON Company.id = Action.companyId
    WHERE Company.isActive = true 
    AND Action.actiontypeId = ${req.query.actiontypeId}
    ORDER BY Company.name`;

    res.status(200).json(data);

    return;
  }

  if (req.method === "GET" && mygrouping === "segment") {
    const data =
      await prisma.$queryRaw`SELECT DISTINCT(Company.name), Company.id
    FROM Company
    INNER JOIN Action ON Company.id = Action.companyId
    WHERE Company.isActive = true 
    AND Action.actiontypeId = ${req.query.actiontypeId}
    AND Company.segmentId = ${req.query.id}
    ORDER BY Company.name`;

    res.status(200).json(data);

    return;
  }

  if (req.method === "GET" && mygrouping === "bt") {
    const data =
      await prisma.$queryRaw`SELECT DISTINCT(Company.name), Company.id
    FROM Company
    INNER JOIN Action ON Company.id = Action.companyId
    WHERE Company.isActive = true 
    AND Action.actiontypeId = ${req.query.actiontypeId}
    AND Company.businesstypeId = ${req.query.id}
    ORDER BY Company.name`;

    res.status(200).json(data);

    return;
  }

  if (req.method === "GET" && mygrouping === "user") {
    const data =
      await prisma.$queryRaw`SELECT DISTINCT(Company.name), Company.id
    FROM Company
    INNER JOIN Action ON Company.id = Action.companyId
    WHERE Company.isActive = true 
    AND Action.actiontypeId = ${req.query.actiontypeId}
    AND Company.userId = ${req.query.id}
    ORDER BY Company.name`;

    res.status(200).json(data);

    return;
  }

  //For PLOC Monthly Scorecard where it can be all users or specific users
  if (req.method === "GET") {
    if (mygrouping === "") {
      const data =
        await prisma.$queryRaw`SELECT DISTINCT(Company.name), Company.id
        FROM Company
        INNER JOIN Action ON Company.id = Action.companyId
        WHERE Company.isActive = true 
        AND Action.actiontypeId = ${req.query.actiontypeId}
        AND MONTH(CONVERT_TZ(Action.businessDate, '+00:00', '+08:00')) = ${
          req.query.id.split("-")[1]
        }
        AND YEAR(CONVERT_TZ(Action.businessDate, '+00:00', '+08:00')) = ${
          req.query.id.split("-")[0]
        }
        ORDER BY Company.name`;

      res.status(200).json(data);

      return;
    } else {
      const data =
        await prisma.$queryRaw`SELECT DISTINCT(Company.name), Company.id
        FROM Company
        INNER JOIN Action ON Company.id = Action.companyId
        WHERE Company.isActive = true 
        AND Action.actiontypeId = ${req.query.actiontypeId}
        AND Company.userId = ${req.query.groupbyfilter}
        AND MONTH(CONVERT_TZ(Action.businessDate, '+00:00', '+08:00')) = ${
          req.query.id.split("-")[1]
        }
        AND YEAR(CONVERT_TZ(Action.businessDate, '+00:00', '+08:00')) = ${
          req.query.id.split("-")[0]
        }
        ORDER BY Company.name`;

      res.status(200).json(data);

      return;
    }
  }
}
