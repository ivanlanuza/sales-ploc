import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  var userfilter = req.query.filterselect;
  var statusfilter = req.query.statusselect;
  //console.log(userfilter);

  if (req.method === "GET" && statusfilter === "Opp") {
    const orig =
      await prisma.$queryRaw`SELECT A.companyId, A.name, Segment.code, opp_date, last_contact, SUM(interactions) as interactions from
      (
      SELECT T1.companyId, name, segmentID, userId, opp_date, last_contact FROM
          (Select companyID, name, segmentID, userId, max(businessDate) as last_contact FROM V_CompanyOpportunity group by companyID) AS T1 
      INNER JOIN
          (Select companyId, businessDate AS opp_date from V_CompanyOpportunity WHERE actionTypeId = '03') AS T2 ON T1.companyId = T2.companyId
      ) AS A 
  INNER JOIN V_CompanyOpportunity AS B ON A.companyID = B.companyId
  INNER JOIN Segment ON A.segmentID = Segment.id
  WHERE businessDate >=opp_date AND businessDate <= last_contact AND A.userID = ${userfilter}
  GROUP BY A.companyId ORDER BY last_contact`;
    //console.log(orig);
    res.status(200).json(orig);
    return;
  }

  if (req.method === "GET" && statusfilter === "Lead") {
    const orig =
      await prisma.$queryRaw`SELECT A.companyId, A.name, Segment.code, opp_date, last_contact, SUM(interactions) as interactions from
      (
      SELECT T1.companyId, name, segmentID, userId, opp_date, last_contact FROM
          (Select companyID, name, segmentID, userId, max(businessDate) as last_contact FROM V_CompanyLead group by companyID) AS T1 
      INNER JOIN
          (Select companyId, businessDate AS opp_date from V_CompanyLead WHERE actionTypeId = '02') AS T2 ON T1.companyId = T2.companyId
      ) AS A 
  INNER JOIN V_CompanyLead AS B ON A.companyID = B.companyId
  INNER JOIN Segment ON A.segmentID = Segment.id
  WHERE businessDate >=opp_date AND businessDate <= last_contact AND A.userID = ${userfilter}
  GROUP BY A.companyId ORDER BY last_contact`;
    //console.log(orig);
    res.status(200).json(orig);
    return;
  }
}

/*
Needed to run manually in database:

CREATE VIEW V_CompanyLead AS
select companyID, name, segmentID, userId, actionTypeId, max(businessDate) as businessDate, count(*) as interactions
from Action INNER JOIN Company ON Action.companyId = Company.id
WHERE statusID = 2 AND isActive = 1
GROUP BY companyId, actionTypeId

CREATE VIEW V_CompanyOpportunity AS
select companyID, name, segmentID, userId, actionTypeId, max(businessDate) as businessDate, count(*) as interactions
from Action INNER JOIN Company ON Action.companyId = Company.id
WHERE statusID = 3 AND isActive = 1
GROUP BY companyId, actionTypeId
*/
