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
    AND Action.actiontypeId = ${req.query.actiontypeId}`;

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
    AND Company.segmentId = ${req.query.id}`;

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
    AND Company.businesstypeId = ${req.query.id}`;

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
    AND Company.userId = ${req.query.id}`;

    res.status(200).json(data);

    return;
  }
}
