import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "lib/prisma";
import HeaderBar from "components/headerbar";

import { getSegment, getSource, getBusinessType, getStatus } from "lib/data";
import Companies from "components/companylist";

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
      <div className="font-mono">
        <div>
          <HeaderBar email={session.user.email} image={session.user.image} />
        </div>
        <div className="grid grid-cols-8 gap-4">
          <div className="justify-center col-span-2 m-0 mb-2 py-8 px-2 place-content-center">
            <div className="block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg ml-1 leading-6 font-bold text-gray-900 mb-4">
                  Filters
                </h3>
                <div className="justify-center p-0 m-0 mb-0">
                  <span className="ml-1 text-xs text-gray-400 font-light ">
                    Segment
                  </span>
                  <div className="mb-2 xl:w-100">
                    <select
                      className="form-select appearance-none
                      block
                      w-full
                      px-4
                      py-3
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      text-sm
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      value={segmentSelect}
                      onChange={(e) => {
                        setSegmentSelect(e.target.value);

                        setBusinessTypeList(
                          bt.filter(function (list) {
                            return list.segmentId === e.target.value;
                          })
                        );

                        setBusinessTypeSelect("");
                      }}
                    >
                      <option value="">All Segments</option>
                      {segment.map((segmentoption) => (
                        <option key={segmentoption.id} value={segmentoption.id}>
                          {segmentoption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="justify-center p-0 m-0 mb-0">
                  <span className="ml-1 text-xs text-gray-400 font-light ">
                    Business Type
                  </span>
                  <div className="mb-2 xl:w-100">
                    <select
                      className="form-select appearance-none
                      block
                      w-full
                      px-4
                      py-3
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      value={businesstypeSelect}
                      onChange={(e) => {
                        setBusinessTypeSelect(e.target.value);
                      }}
                    >
                      <option value="">All Business Types</option>
                      {businesstypelist.map((businesstypelistoption) => (
                        <option
                          key={businesstypelistoption.id}
                          value={businesstypelistoption.id}
                        >
                          {businesstypelistoption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="justify-center p-0 m-0 mb-0">
                  <span className="ml-1 text-xs text-gray-400 font-light ">
                    Source
                  </span>
                  <div className="mb-2 xl:w-100">
                    <select
                      className="form-select appearance-none
                      block
                      w-full
                      px-4
                      py-3
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      value={sourceSelect}
                      onChange={(e) => {
                        setSourceSelect(e.target.value);
                      }}
                    >
                      <option value="">All Sources</option>
                      {source.map((sourceoption) => (
                        <option key={sourceoption.id} value={sourceoption.id}>
                          {sourceoption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="justify-center p-0 m-0 mb-0">
                  <span className="ml-1 text-xs text-gray-400 font-light ">
                    Status
                  </span>
                  <div className="mb-2 xl:w-100">
                    <select
                      className="form-select appearance-none
                      block
                      w-full
                      px-4
                      py-3
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      value={statusSelect}
                      onChange={(e) => {
                        setStatusSelect(e.target.value);
                      }}
                    >
                      <option value="">All Status</option>
                      {statuslist.map((statusoption) => (
                        <option key={statusoption.id} value={statusoption.id}>
                          {statusoption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="justify-center p-0 m-0 mb-0">
                  <span className="ml-1 text-xs text-gray-400 font-light ">
                    Name
                  </span>
                  <input
                    type="text"
                    className="form-control block
                    w-full
                    px-4
                    py-3
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    mb-4
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="companyname"
                    placeholder="Input Company Name Filter"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="
                  w-full
                  px-6
                  py-3.5
                  text-white bg-indigo-600
                  font-medium
                  text-sm
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  mb-2
                  mt-4
                  hover:bg-indigo-700 hover:shadow-lg
                  focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-indigo-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out"
                  onClick={(e) => {
                    e.preventDefault();

                    handleSubmit();
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="justify-center col-span-6 py-8 px-2 m-0 mb-6 place-content-centter">
            <div className="p-0 pr-2 place-content-center font-mono">
              <div className="block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Company Directory
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    <span className="font-medium">{companies.length}</span>{" "}
                    results found
                  </p>
                </div>
                {companies.length !== 0 && (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Segment
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Business Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Source
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
