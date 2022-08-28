import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  //console.log(req.query.filterselect + req.query.fromDate + req.query.toDate);

  if (req.method !== "GET") {
    return res.status(501).end();
  }

  if (!req.query.fromDate)
    return res
      .status(400)
      .json({ message: "Required parameter amount missing" });

  if (!req.query.toDate)
    return res
      .status(400)
      .json({ message: "Required parameter amount missing" });

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  var myfilter = req.query.filterselect;
  var mytodate = new Date(req.query.toDate);
  var myfromdate = new Date(req.query.fromDate);

  //console.log(myfromdate);
  //console.log(mytodate);
  if (req.method === "GET" && myfilter === "") {
    const orig = await prisma.$queryRaw`SELECT 
    DATE_FORMAT(Action.businessDate, "%Y-%M") AS yearmonth,
    DATE_FORMAT(Action.businessDate, "%Y-%m") AS yearmonthid,
    ActionType.code as status_name,
    CAST(COUNT(DISTINCT Action.companyId) AS CHAR) as count 
    FROM Company
      INNER JOIN Action ON Company.id = Action.companyId 
      INNER JOIN ActionType ON ActionType.id = Action.actiontypeId
    WHERE isActive = true 
    AND actiontypeId IN ('01','02','03','04')
    AND businessDate BETWEEN ${myfromdate} AND ${mytodate}
    GROUP BY actiontypeId, ActionType.code, MONTH(Action.businessDate), YEAR(Action.businessDate)
    ORDER BY YEAR(Action.businessDate), MONTH(Action.businessDate), actiontypeId`;

    var a = [];
    if (orig.length != 0) {
      var name = "";
      var i, x;
      for (i = 0; i < orig.length; i++) {
        if (orig[i].yearmonth != name) {
          if (name != "") {
            a.push(x);
          }
          x = {};
          x["name"] = orig[i].yearmonth;
          x["id"] = orig[i].yearmonthid;
          name = orig[i].yearmonth;
        }
        x[orig[i].status_name.toUpperCase()] = orig[i].count;
      }
      a.push(x);
    }
    //console.log("all users: " + a);
    res.status(200).json(a);
    return;
  }

  if (req.method === "GET" && myfilter != "") {
    const orig = await prisma.$queryRaw`SELECT 
    DATE_FORMAT(Action.businessDate, "%Y-%M") AS yearmonth,
    DATE_FORMAT(Action.businessDate, "%Y-%m") AS yearmonthid,
    ActionType.code as status_name,
    CAST(COUNT(DISTINCT Action.companyId) AS CHAR) as count 
    FROM Company
      INNER JOIN Action ON Company.id = Action.companyId 
      INNER JOIN ActionType ON ActionType.id = Action.actiontypeId
      INNER JOIN User ON User.id = Company.userId
    WHERE Company.isActive = true 
    AND actiontypeId IN ('01','02','03','04')
    AND User.id = ${req.query.filterselect}
    AND businessDate BETWEEN ${myfromdate} AND ${mytodate}
    GROUP BY actiontypeId, ActionType.code, MONTH(Action.businessDate), YEAR(Action.businessDate)
    ORDER BY YEAR(Action.businessDate), MONTH(Action.businessDate), actiontypeId`;

    var a = [];
    if (orig.length != 0) {
      var name = "";
      var i, x;
      for (i = 0; i < orig.length; i++) {
        if (orig[i].yearmonth != name) {
          if (name != "") {
            a.push(x);
          }
          x = {};
          x["name"] = orig[i].yearmonth;
          x["id"] = orig[i].yearmonthid;
          name = orig[i].yearmonth;
        }
        x[orig[i].status_name.toUpperCase()] = orig[i].count;
      }
      a.push(x);
    }
    //console.log("indi: " + a);
    res.status(200).json(a);
    return;
  }
}
