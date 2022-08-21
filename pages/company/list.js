import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "lib/prisma";
import HeaderBar from "components/headerbar";

import { getSegment, getSource, getBusinessType, getStatus } from "lib/data";
import Companies from "components/companylist";

import StackedSelectLabel from "components/core/StackedSelectLabel";
import StackedTextBoxLabel from "components/core/StackedTextBoxLabel";
import StackedButtonPrimary from "components/core/StackedButtonPrimary";
import CardHeader from "components/core/CardHeader";

export default function CompanyList({ segment, source, bt, statuslist }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [segmentSelect, setSegmentSelect] = useState("");
  const [businesstypeSelect, setBusinessTypeSelect] = useState("");
  const [sourceSelect, setSourceSelect] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [businesstypelist, setBusinessTypeList] = useState(bt);
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState("");

  if (!session) {
    return <div className="text-center pt-8">Not logged in</div>;
  }

  if (status === "authenticated" && !session.user.auth) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && session.user.auth) {
    return (
      <div className="">
        <div>
          <HeaderBar email={session.user.email} image={session.user.image} />
        </div>
        <div className="md:flex p-4 ">
          <div className="">
            <div className="block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader
                title="Filters"
                subtitle="Use selection to filter list"
              />
              <div className="px-4 pb-4 sm:px-6 border-b border-gray-200">
                <StackedSelectLabel
                  label="Segment"
                  value={segmentSelect}
                  data={segment}
                  placeholder="All Segments"
                  onChange={(e) => {
                    setSegmentSelect(e.target.value);
                    setBusinessTypeList(
                      bt.filter(function (list) {
                        return list.segmentId === e.target.value;
                      })
                    );
                    setBusinessTypeSelect("");
                  }}
                />
                <StackedSelectLabel
                  label="Business Type"
                  value={businesstypeSelect}
                  data={businesstypelist}
                  placeholder="All Business Types"
                  onChange={(e) => {
                    setBusinessTypeSelect(e.target.value);
                  }}
                />
                <StackedSelectLabel
                  label="Source"
                  value={sourceSelect}
                  data={source}
                  placeholder="All Sources"
                  onChange={(e) => {
                    setSourceSelect(e.target.value);
                  }}
                />
                <StackedSelectLabel
                  label="Status"
                  value={statusSelect}
                  data={statuslist}
                  placeholder="All Status"
                  onChange={(e) => {
                    setStatusSelect(e.target.value);
                  }}
                />
                <StackedTextBoxLabel
                  value={companyName}
                  label="Name"
                  id="companyname"
                  placeholder="Input Company Name Filter"
                  type="text"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />

                <StackedButtonPrimary
                  href=""
                  title="Filter"
                  onClick={(e) => {
                    e.preventDefault();

                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 ml-0 lg:ml-4 w-full">
            <div className="p-0 w-full">
              <div className="block w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader
                  title="Company Directory"
                  subtitle={companies.length + ` companies found`}
                />

                {companies.length !== 0 && (
                  <table className="w-full text-sm font-sans text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="hidden lg:block px-6 py-3">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Companies companies={companies} />
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit() {
    fetch(
      "/api/getcompanies?" +
        new URLSearchParams({
          segmentId: segmentSelect,
          businesstypeId: businesstypeSelect,
          sourceId: sourceSelect,
          statusId: statusSelect,
          name: companyName,
        }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  }
}

export async function getServerSideProps(context) {
  let segment = await getSegment(prisma);
  segment = JSON.parse(JSON.stringify(segment));

  let source = await getSource(prisma);
  source = JSON.parse(JSON.stringify(source));

  let bt = await getBusinessType(prisma);
  bt = JSON.parse(JSON.stringify(bt));

  let statuslist = await getStatus(prisma);
  statuslist = JSON.parse(JSON.stringify(statuslist));

  return {
    props: {
      segment,
      source,
      bt,
      statuslist,
    },
  };
}
