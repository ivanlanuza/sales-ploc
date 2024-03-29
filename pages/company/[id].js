import prisma from "lib/prisma";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getCompany, getInteractions } from "lib/data";
import { getSession } from "next-auth/react";
import { useState, useRef } from "react";

import ContactInfoList from "components/contactinfo";
import HeaderBar from "components/headerbar";
import ButtonPrimary from "components/core/ButtonPrimary";
import ButtonDelete from "components/core/ButtonDelete";
import ButtonCancel from "components/core/ButtonCancel";
import CardHeader from "components/core/CardHeader";
import InputDataLabel from "components/core/InputDataLabel";
import SimpleModal from "components/core/SimpleModal";
import InteractionTable from "components/interactiontable";

export default function Entry({ company, interactions }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  if (!session) {
    return <div className="text-center pt-8">Not logged in</div>;
  }

  if (
    (status === "authenticated" && !session.user.auth) ||
    !company ||
    company.isActive === false
  ) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && session.user.auth && company) {
    return (
      <div className="text-center">
        <HeaderBar email={session.user.email} image={session.user.image} />
        <div className="md:flex p-4">
          <div className="block bg-white w-full lg:w-3/5 text-left rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader
              title="Company Information"
              subtitle="View Company Information"
            />
            <div className="border-t border-gray-200">
              <InputDataLabel label="Company Name" value={company.name} />
              <InputDataLabel label="L.E. Name" value={company.other_name} />
              <InputDataLabel
                label="Business Address"
                value={company.address}
              />
              <InputDataLabel label="Segment" value={company.segment.name} />
              <InputDataLabel
                label="Business Type"
                value={company.businesstype.name}
              />
              <InputDataLabel label="Source" value={company.source.name} />
              <InputDataLabel label="Status" value={company.status.name} />
            </div>
            <div className="hidden lg:block p-4 mb-12">
              <ButtonPrimary
                title="Edit Company"
                href={`/company/` + company.id + `/edit`}
              />
              <ButtonDelete
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              />
              <ButtonCancel href="/company/list" title="back to list" />
            </div>
          </div>

          <div className="ml-0 lg:ml-4 mt-4 lg:mt-0 font-sans text-left block w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader title="Contact List" subtitle="View List of Contacts" />
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
                      <th scope="col" className="hidden lg:block px-6 py-3">
                        Contact Info
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <ContactInfoList
                      contactinfolist={company.ContactInfo}
                      companyid={company.id}
                    />
                  </tbody>
                </table>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 mb-12">
              <ButtonPrimary
                title="Add Contact"
                href={`/company/` + company.id + `/contact/entry`}
                onClick={(e) => {
                  //e.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full px-4">
          <div className="bg-white shadow w-full overflow-hidden sm:rounded-lg float-left  text-left ">
            <InteractionTable
              interactions={interactions}
              companyid={company.id}
            />
          </div>
        </div>
        <SimpleModal
          dialogtitle="Delete Company"
          longtext="Deleting this company will also delete all accompanying data (interactions, contacts, etc).  Are you sure you want to delete this company?"
          buttontitle="Delete Company"
          onClickProceed={() => {
            setOpen(false);
            handleDelete();
          }}
          onClickCancel={() => setOpen(false)}
          //ref={cancelButtonRef}
          onClose={setOpen}
          show={open}
        />
      </div>
    );
  }

  async function handleDelete() {
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

  let interactions = await getInteractions(context.params.id, prisma);
  interactions = JSON.parse(JSON.stringify(interactions));

  return {
    props: {
      company,
      interactions,
    },
  };
}
