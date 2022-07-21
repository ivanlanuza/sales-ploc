import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "lib/prisma";
import { getCompany } from "lib/data.js";

import HeaderBar from "components/headerbar";
import CardHeader from "components/core/CardHeader";
import InputTextBoxLabel from "components/core/InputTextBoxLabel";
import ButtonPrimary from "components/core/ButtonPrimary";
import MessageError from "components/core/MessageError";
import InputDataLabel from "components/core/InputDataLabel";
import ButtonCancel from "components/core/ButtonCancel";

export default function ContactEntry({ company }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [contactEmail, setContactEmail] = useState("");

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
      <div className="w-full">
        <div>
          <HeaderBar email={session.user.email} image={session.user.image} />
          <div className="bg-white shadow overflow-hidden sm:rounded-lg float-left m-8 text-left w-2/5">
            <CardHeader
              title="Create Contact"
              subtitle="Add a new contact for a company"
            />
            <InputDataLabel label="Company Name" value={company.name} />
            <InputTextBoxLabel
              type="text"
              label="Contact Name"
              id="contactname"
              placeholder="Enter Contact Name"
              value={contactName}
              onChange={(e) => {
                setContactName(e.target.value);
                setButtonActive(false);
              }}
            />
            <InputTextBoxLabel
              type="text"
              label="Role"
              id="contactrole"
              placeholder="Enter Contact Role"
              value={contactRole}
              onChange={(e) => {
                setContactRole(e.target.value);
                setButtonActive(false);
              }}
            />
            <InputTextBoxLabel
              type="text"
              label="Mobile"
              id="contactmobile"
              placeholder="Enter Contact Mobile"
              value={contactMobile}
              onChange={(e) => {
                setContactMobile(e.target.value);
                setButtonActive(false);
              }}
            />
            <InputTextBoxLabel
              type="text"
              label="Email"
              id="contactemail"
              placeholder="Enter Contact Email"
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value);
                setButtonActive(false);
              }}
            />
            <div className="p-4">
              <ButtonPrimary
                title="Create New Contact"
                disabled={buttonactive}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />

              <ButtonCancel href={`/company/` + company.id} title="cancel" />
            </div>
            {validationerror && (
              <MessageError label="Contact Name is Mandatory" />
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

    if (!contactName || contactName.trim() === "") {
      errorflag = true;
      setValidationError(true);
    } else {
      await fetch("/api/contactcreate", {
        body: JSON.stringify({
          contactName,
          contactRole,
          contactEmail,
          contactMobile,
          companyId: company.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      router.push(`/company/` + company.id);
    }
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
