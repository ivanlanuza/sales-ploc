import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import HeaderBar from "components/headerbar";
import PlocModal from "components/core/PlocModal";

import StackedSelectLabel from "components/core/StackedSelectLabel";
import StackedButtonPrimary from "components/core/StackedButtonPrimary";
import CardHeader from "components/core/CardHeader";
import Datalist from "components/ploclist";
import TableFooterPLOC from "components/core/TableFooterPLOC";

const features = [
  {
    id: "alldata",
    name: "All Data",
  },
  {
    id: "segment",
    name: "Group By Segment",
  },
  {
    id: "bt",
    name: "Group By Business Type",
  },
  {
    id: "user",
    name: "Group By User",
  },
];
export default function CompanyList({}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [companylist, setCompanyList] = useState("");

  const [filterselect, setFilterSelect] = useState("alldata");
  const [filterlist, setFilterList] = useState(features);
  const [scorecard, setScorecard] = useState("");

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
                  label="Group By"
                  value={filterselect}
                  data={filterlist}
                  onChange={(e) => {
                    setFilterSelect(e.target.value);
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
                  title="PLOC Current Snapshot"
                  subtitle="View the current PLOC pipeline."
                />

                {scorecard.length != 0 && (
                  <table className="hidden lg:block w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Prospect
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Leads
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Opportunity
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Client
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Datalist
                        datalist={scorecard}
                        groupbyFilter={filterselect}
                        setOpen={setOpen}
                        setCompanyList={setCompanyList}
                      />
                      <TableFooterPLOC datalist={scorecard} />
                    </tbody>
                  </table>
                )}

                {scorecard.length != 0 && (
                  <table className="block lg:hidden w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3 text-center">
                          P
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          L
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          O
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          C
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Datalist
                        datalist={scorecard}
                        groupbyFilter={filterselect}
                        setOpen={setOpen}
                        setCompanyList={setCompanyList}
                      />
                      <TableFooterPLOC datalist={scorecard} />
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <PlocModal
          dialogtitle="Company List"
          longtext={companylist}
          buttontitle="Close"
          onClickProceed={() => {
            setOpen(false);
          }}
          onClickCancel={() => setOpen(false)}
          onClose={setOpen}
          show={open}
        />
      </div>
    );
  }

  async function handleSubmit() {
    fetch(
      "/api/insights/plocsnapshot?" +
        new URLSearchParams({
          filterselect: filterselect,
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
        setScorecard(data);
      });
  }
}
