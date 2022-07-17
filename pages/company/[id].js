import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderBar from "components/headerbar";
import { getCompany } from "lib/data";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/outline";
import ContactInfoList from "components/contactinfo";

export default function entry({ company }) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <div className="grid grid-cols-8 gap-4">
          <div className="bg-white shadow col-span-3 overflow-hidden sm:rounded-lg font-mono float-left m-8 text-left">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-bold text-gray-900">
                Company Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                View Company Information
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Company name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {company.name}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Legal Entity Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {company.other_name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Segment</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {company.segment.name}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Business Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {company.businesstype.name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Source</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {company.source.name}
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
                py-2
                h-12
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
                    //e.preventDefault();
                  }}
                >
                  Edit Company
                </button>
              </Link>

              <button
                type="submit"
                className="  
                px-6
                py-2
                h-12
                text-white bg-red-900
                font-medium
                text-sm
                leading-tight
                uppercase
                rounded
                shadow-md
                float-right
                mb-4
                mr-2
                hover:bg-red-700 hover:shadow-lg
                focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-red`-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <TrashIcon className="h-6 w-6 text-white" />
              </button>
              <Link href="/company/list" className="flex ">
                <span className="float-left mr-8 text-sm mt-2 p-1 rounded-sm text-indigo-500 hover:font-bold">
                  back to list
                </span>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow col-span-5 overflow-hidden sm:rounded-lg font-mono float-left m-8 text-left">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-bold text-gray-900">
                List of Contacts
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                View Contacts for this company
              </p>
            </div>
            <div className="border-t border-gray-200">
              {company.ContactInfo.length !== 0 && (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Contact Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <ContactInfoList contactinfolist={company.ContactInfo} />
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit() {
    await fetch("/api/deletecompany", {
      body: JSON.stringify({
        id: company.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    router.push(`/company/list`);
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let company = await getCompany(context.params.id, prisma);
  company = JSON.parse(JSON.stringify(company));

  return {
    props: {
      company,
    },
  };
}
