import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "lib/prisma";
import { getSegment, getSource, getBusinessType } from "lib/data.js";
import HeaderBar from "components/headerbar";

export default function CompanyPage({ segment, source, bt }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [otherName, setOtherName] = useState("");

  const [segmentSelect, setSegmentSelect] = useState("");
  const [businesstypeSelect, setBusinessTypeSelect] = useState("");
  const [sourceSelect, setSourceSelect] = useState("");
  const [businesstypelist, setBusinessTypeList] = useState(bt);

  const [validationerror, setValidationError] = useState(false);
  const [successflag, setSuccessFlag] = useState(false);
  const [buttonactive, setButtonActive] = useState(false);

  if (!session) {
    return <div className="text-center pt-8">Not logged in</div>;
  }

  if (status === "authenticated" && !session.user.auth) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && session.user.auth) {
    return (
      <div className="w-full">
        <div>
          <HeaderBar email={session.user.email} image={session.user.image} />
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-lg xl:w-3/5 font-mono pb-0">
            <form>
              <div className="form-group mb-4">
                <span className="text-xs text-gray-400 font-light ">
                  Company Name
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="companyname"
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setButtonActive(false);
                    setSuccessFlag(false);
                  }}
                />
              </div>
              <div className="form-group mb-4">
                <span className="text-xs text-gray-400 font-light ">
                  L.E. Name
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="othername"
                  placeholder="Enter legal entity name"
                  value={otherName}
                  onChange={(e) => {
                    setOtherName(e.target.value);
                    setButtonActive(false);
                    setSuccessFlag(false);
                  }}
                />
              </div>
              <div className="justify-center p-0 m-0 mb-4">
                <span className="text-xs text-gray-400 font-light ">
                  Segment
                </span>
                <div className="mb-4 xl:w-100">
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
                    value={segmentSelect}
                    onChange={(e) => {
                      setSegmentSelect(e.target.value);
                      setButtonActive(false);
                      setSuccessFlag(false);

                      setBusinessTypeList(
                        bt.filter(function (list) {
                          return list.segmentId === e.target.value;
                        })
                      );
                    }}
                  >
                    <option>Select a segment</option>
                    {segment.map((segmentoption) => (
                      <option key={segmentoption.id} value={segmentoption.id}>
                        {segmentoption.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="justify-center p-0 m-0 mb-4">
                <span className="text-xs text-gray-400 font-light ">
                  Business Type
                </span>
                <div className="mb-4 xl:w-100">
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
                      setButtonActive(false);
                      setSuccessFlag(false);
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
                </div>
              </div>
              <div className="justify-center p-0 m-0 mb-4">
                <span className="text-xs text-gray-400 font-light ">
                  Source
                </span>
                <div className="mb-6 xl:w-100">
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
                      setButtonActive(false);
                      setSuccessFlag(false);
                    }}
                  >
                    <option>Select a source</option>
                    {source.map((sourceoption) => (
                      <option key={sourceoption.id} value={sourceoption.id}>
                        {sourceoption.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={buttonactive}
                className="
      w-full
      px-6
      py-2.5
      text-white bg-indigo-600
      font-medium
      text-lg
      leading-tight
      uppercase
      rounded
      shadow-md
      mb-8
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
                Create New Company
              </button>
            </form>

            {validationerror && (
              <div
                className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full mt-0"
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

            {successflag && (
              <div
                className="mt-0 bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check-circle"
                  className="w-4 h-4 mr-2 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  ></path>
                </svg>
                New Company record created!
              </div>
            )}
          </div>
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
      await fetch("/api/company", {
        body: JSON.stringify({
          companyName,
          otherName,
          segmentSelect,
          businesstypeSelect,
          sourceSelect,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      setSuccessFlag(true);
      setCompanyName("");
      setOtherName("");
      setSegmentSelect("");
      setBusinessTypeSelect("");
      setSourceSelect("");
    }
  }
}

export async function getServerSideProps(context) {
  let segment = await getSegment(prisma);
  segment = JSON.parse(JSON.stringify(segment));

  let source = await getSource(prisma);
  source = JSON.parse(JSON.stringify(source));

  let bt = await getBusinessType(prisma);
  bt = JSON.parse(JSON.stringify(bt));

  return {
    props: {
      segment,
      source,
      bt,
    },
  };
}
