import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "lib/prisma";

import HeaderBar from "components/headerbar";

import { getUsers } from "lib/data";
import RecoActionsTableHeader from "components/RecoActionsTableHeader";

import StackedSelectLabel from "components/core/StackedSelectLabel";
import StackedButtonPrimary from "components/core/StackedButtonPrimary";
import CardHeader from "components/core/CardHeader";
import RecoActionList from "components/recoactionlist";

export default function PlocMonthlyScorecard({ userlist }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [statusselect, setStatusSelect] = useState("Opp");
  const [submittedstatusselect, setSubmittedStatusSelect] = useState();
  const [filterselect, setFilterSelect] = useState("");
  const [filterlist, setFilterList] = useState(userlist);
  const [datatable, setDataTable] = useState("");
  const [loading, setLoading] = useState("");
  const [norecords, setNoRecords] = useState(false);

  const statuslist = [
    {
      id: "Opp",
      name: "Opportunity",
    },
    {
      id: "Lead",
      name: "Lead",
    },
  ];

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
          <div className="w-full xl:w-2/6">
            <div className="block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader
                title="Filters"
                subtitle="Use selection to filter list"
              />
              <div className="px-4 pb-4 sm:px-6 border-b border-gray-200">
                <StackedSelectLabel
                  label="User"
                  value={filterselect}
                  data={filterlist}
                  onChange={(e) => {
                    setFilterSelect(e.target.value);
                  }}
                />
                <StackedSelectLabel
                  label="Status"
                  value={statusselect}
                  data={statuslist}
                  onChange={(e) => {
                    setStatusSelect(e.target.value);
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
                  title="Recommended Actions"
                  subtitle="Get ideas on what to do next"
                />

                <span className="pl-4 py-5 sm:pl-6 mb-4 mt-1 max-w-2xl text-sm text-gray-500">
                  {loading}
                </span>
                {datatable.length != 0 && (
                  <table className="hidden lg:block w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <RecoActionsTableHeader
                      tablestatus={submittedstatusselect}
                    />
                    <tbody>
                      <RecoActionList
                        recoactions={datatable}
                        status={submittedstatusselect}
                      />
                    </tbody>
                  </table>
                )}
                {norecords && (
                  <span className="py-5 mb-4 mt-1 text-sm text-red-500">
                    No records found.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit() {
    setSubmittedStatusSelect(statusselect);
    setDataTable("");
    setLoading("Loading recommendations, please wait...");
    setNoRecords(false);
    fetch(
      "/api/insights/recoactions?" +
        new URLSearchParams({
          filterselect: filterselect,
          statusselect: statusselect,
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
        setDataTable(data);
        setLoading("");
        data.length != 0 ? setNoRecords(false) : setNoRecords(true);
      });

    //console.log(datatable);
  }
}

export async function getServerSideProps(context) {
  let userlist = await getUsers(prisma);
  userlist = JSON.parse(JSON.stringify(userlist));

  return {
    props: {
      userlist,
    },
  };
}
