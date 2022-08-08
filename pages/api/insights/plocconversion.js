import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  var myfilter = req.query.filterselect;

  if (req.method === "GET" && myfilter === "segment") {
    const orig = await prisma.$queryRaw`SELECT 
    Company.segmentId, 
    ActionType.code as status_name,
    Segment.name as segment_name,
    CAST(COUNT(DISTINCT Action.companyId) AS CHAR) as count 
    FROM Company
      INNER JOIN Action ON Company.id = Action.companyId 
      INNER JOIN ActionType ON ActionType.id = Action.actiontypeId
      INNER JOIN Segment ON Company.segmentId = Segment.id
    WHERE isActive = true 
    AND actiontypeId IN ('01','02','03','04')
    GROUP BY Company.segmentId, actiontypeId, ActionType.code, Segment.name
    ORDER BY Company.segmentId, actiontypeId`;

    var a = [];
    if (orig.length != 0) {
      var name = "";
      var i, x;
      for (i = 0; i < orig.length; i++) {
        if (orig[i].segment_name != name) {
          if (name != "") {
            a.push(x);
          }
          x = {};
          x["name"] = orig[i].segment_name;
          x["id"] = orig[i].segmentId;
          name = orig[i].segment_name;
        }
        x[orig[i].status_name.toUpperCase()] = orig[i].count;
      }
      a.push(x);
    }
    res.status(200).json(a);

    return;
  }

  if (req.method === "GET" && myfilter === "bt") {
    const orig = await prisma.$queryRaw`SELECT 
    Company.businesstypeId,
    ActionType.code as status_name,
    BusinessType.name as bt_name,
    CAST(COUNT(DISTINCT Action.companyId) AS CHAR) as count 
    FROM Company
      INNER JOIN Action ON Company.id = Action.companyId 
      INNER JOIN ActionType ON ActionType.id = Action.actiontypeId
      INNER JOIN BusinessType ON Company.businesstypeId = BusinessType.id
    WHERE isActive = true 
    AND actiontypeId IN ('01','02','03','04')
    GROUP BY Company.businesstypeId, actiontypeId, ActionType.code, BusinessType.name
    ORDER BY Company.businesstypeId,  actiontypeId`;

    var a = [];
    if (orig.length != 0) {
      var name = "";
      var i, x;
      for (i = 0; i < orig.length; i++) {
        if (orig[i].bt_name != name) {
          if (name != "") {
            a.push(x);
          }
          x = {};
          x["name"] = orig[i].bt_name;
          x["id"] = orig[i].businesstypeId;
          name = orig[i].bt_name;
        }
        x[orig[i].status_name.toUpperCase()] = orig[i].count;
      }
      a.push(x);
    }
    res.status(200).json(a);

    return;
  }

  if (req.method === "GET" && myfilter === "alldata") {
    const orig = await prisma.$queryRaw`SELECT 
    ActionType.code as status_name,
    CAST(COUNT(DISTINCT Action.companyId) AS CHAR) as count 
    FROM Company
      INNER JOIN Action ON Company.id = Action.companyId 
      INNER JOIN ActionType ON ActionType.id = Action.actiontypeId
    WHERE isActive = true 
    AND actiontypeId IN ('01','02','03','04')
    GROUP BY actiontypeId, ActionType.code 
    ORDER BY actiontypeId`;

    var a = [];
    if (orig.length != 0) {
      var i, x;
      x = {};
      x["name"] = "All Companies";
      for (i = 0; i < orig.length; i++) {
        x[orig[i].status_name.toUpperCase()] = orig[i].count;
      }
      a.push(x);
    }
    res.status(200).json(a);

    return;
  }

  if (req.method === "GET" && myfilter === "user") {
    const orig = await prisma.$queryRaw`SELECT 
    Company.userId,
    ActionType.code as status_name,
    User.email as user_name,
    CAST(COUNT(DISTINCT Action.companyId) AS CHAR) as count 
    FROM Company
      INNER JOIN Action ON Company.id = Action.companyId 
      INNER JOIN ActionType ON ActionType.id = Action.actiontypeId
      INNER JOIN User ON Company.userId = User.id
    WHERE Company.isActive = true 
    AND actiontypeId IN ('01','02','03','04')
    GROUP BY Company.userId, actiontypeId, ActionType.code, User.email
    ORDER BY Company.userId,  actiontypeId`;

    var a = [];
    if (orig.length != 0) {
      var name = "";
      var i, x;
      for (i = 0; i < orig.length; i++) {
        if (orig[i].user_name != name) {
          if (name != "") {
            a.push(x);
          }
          x = {};
          x["name"] = orig[i].user_name;
          x["id"] = orig[i].userId;
          name = orig[i].user_name;
        }
        x[orig[i].status_name.toUpperCase()] = orig[i].count;
      }
      a.push(x);
    }
    res.status(200).json(a);

    return;
  }
}
