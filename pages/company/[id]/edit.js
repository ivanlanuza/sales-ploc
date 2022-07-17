import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getCompany, getSegment, getSource, getBusinessType } from "lib/data";
import prisma from "lib/prisma";
import HeaderBar from "components/headerbar";
import Link from "next/link";
import { useState } from "react";

export default function CompanyEdit({ company, segment, source, bt }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [companyName, setCompanyName] = useState(company.name);
  const [otherName, setOtherName] = useState(company.other_name);
  const [segmentSelect, setSegmentSelect] = useState(company.segmentId);
  const [businesstypeSelect, setBusinessTypeSelect] = useState(
    company.businesstypeId
  );
  const [sourceSelect, setSourceSelect] = useState(company.sourceId);
  const [businesstypelist, setBusinessTypeList] = useState(bt);

  const [validationerror, setValidationError] = useState(false);
  const [buttonactive, setButtonActive] = useState(false);

  if (!session) {
    return <div className="text-center pt-8">Not logged in</div>;
  }

  if (status === "authenticated" && !session.user.auth) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && session.user.auth) {
    return (
      <div className="text-center">
        <HeaderBar email={session.user.email} image={session.user.image} />
        <div className="bg-white shadow overflow-hidden sm:rounded-lg font-mono float-left m-8 text-left">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              Company Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Edit Company Information
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Company name
                </dt>
                <dd className="mt-0 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control block
                        w-full
                        px-2
                        py-2
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        -mt-2
                        -ml-0
                        -mb-3
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="companyname"
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        setButtonActive(false);
                      }}
                    />
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Legal Entity Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    className="form-control block
                    w-full
                    px-2
                    py-2
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    -mt-2
                    -ml-0
                    -mb-3
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="othername"
                    placeholder="Enter legal entity name"
                    value={otherName}
                    onChange={(e) => {
                      setOtherName(e.target.value);
                      setButtonActive(false);
                    }}
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Segment</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    className="form-select appearance-none
                    block
                    w-full
                    px-2
                    py-2
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    -mt-2
                    -ml-0
                    -mb-3
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    value={segmentSelect}
                    onChange={(e) => {
                      setSegmentSelect(e.target.value);
                      setButtonActive(false);
                      setBusinessTypeSelect("");
                      setBusinessTypeList(
                        bt.filter(function (list) {
                          return list.segmentId === e.target.value;
                        })
                      );
                    }}
                  >
                    {segment.map((segmentoption) => (
                      <option key={segmentoption.id} value={segmentoption.id}>
                        {segmentoption.name}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Business Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    className="form-select appearance-none
                    block
                    w-full
                    px-2
                    py-2
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    -mt-2
                    -ml-0
                    -mb-3
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    value={businesstypeSelect}
                    onChange={(e) => {
                      setBusinessTypeSelect(e.target.value);
                      setButtonActive(false);
                    }}
                  >
                    <option>Select a business type</option>
                    {businesstypelist.map((businesstypelistoption) => (
                      <option
                        key={businesstypelistoption.id}
                        value={businesstypelistoption.id}
                      >
                        {businesstypelistoption.name}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Source</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    className="form-select appearance-none
                    block
                    w-full
                    px-2
                    py-2
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    -mt-2
                    -ml-0
                    -mb-3
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    value={sourceSelect}
                    onChange={(e) => {
                      setSourceSelect(e.target.value);
                      setButtonActive(false);
                    }}
                  >
                    {source.map((sourceoption) => (
                      <option key={sourceoption.id} value={sourceoption.id}>
                        {sourceoption.name}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {company.status.name}
                </dd>
              </div>
            </dl>
          </div>
          <div className="p-4">
            <Link href={`/company/` + company.id + `/edit`}>
              <button
                type="submit"
                className="  
                px-6
                py-2.5
                text-white bg-indigo-600
                font-medium
                text-sm
                leading-tight
                uppercase
                rounded
                shadow-md
                float-right
                mb-4
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
                Save Company Data
              </button>
            </Link>
            <Link href={`/company/` + company.id} className="flex ">
              <span className="float-left mr-8 text-sm mt-2 p-1 rounded-sm text-indigo-500 hover:font-bold">
                cancel
              </span>
            </Link>
          </div>

          {validationerror && (
            <div
              className="bg-red-100 rounded-lg rounded-t-none py-5 px-6 text-base text-red-700 inline-flex items-center w-full mt-0"
              role="alert"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times-circle"
                className="w-4 h-4 mr-2 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                ></path>
              </svg>
              Please fill-up all fields.
            </div>
          )}
        </div>
      </div>
    );
  }

  async function handleSubmit() {
    var errorflag = false;
    setValidationError(false);
    setButtonActive(true);

    if (
      !companyName ||
      companyName.trim() === "" ||
      !otherName ||
      otherName.trim() === "" ||
      !segmentSelect ||
      !businesstypeSelect ||
      !sourceSelect
    ) {
      errorflag = true;
      setValidationError(true);
    } else {
      await fetch("/api/editcompany", {
        body: JSON.stringify({
          companyName,
          otherName,
          segmentSelect,
          businesstypeSelect,
          sourceSelect,
          id: company.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      router.push(`/company/` + company.id);
    }
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let company = await getCompany(context.params.id, prisma);
  company = JSON.parse(JSON.stringify(company));

  let segment = await getSegment(prisma);
  segment = JSON.parse(JSON.stringify(segment));

  let source = await getSource(prisma);
  source = JSON.parse(JSON.stringify(source));

  let bt = await getBusinessType(prisma);
  bt = JSON.parse(JSON.stringify(bt));

  return {
    props: {
      company,
      segment,
      source,
      bt,
    },
  };
}
