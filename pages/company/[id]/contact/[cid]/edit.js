import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getContact } from "lib/data";
import { useState, useRef } from "react";

import prisma from "lib/prisma";
import HeaderBar from "components/headerbar";

import InputTextBoxLabel from "components/core/InputTextBoxLabel";
import CardHeader from "components/core/CardHeader";
import InputTextAreaLabel from "components/core/InputTextAreaLabel";
import ButtonDelete from "components/core/ButtonDelete";
import ButtonPrimary from "components/core/ButtonPrimary";
import SimpleModal from "components/core/SimpleModal";
import ButtonCancel from "components/core/ButtonCancel";

export default function CompanyEdit({ contact, companyid }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [contactName, setContactName] = useState(contact.name);
  const [contactRole, setContactRole] = useState(contact.role);
  const [contactMobile, setContactMobile] = useState(contact.mobile);
  const [contactEmail, setContactEmail] = useState(contact.email);
  const [contactNotes, setContactNotes] = useState(contact.notes);

  const [validationerror, setValidationError] = useState(false);
  const [buttonactive, setButtonActive] = useState(false);

  if (!session) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && !session.user.auth) {
    router.push("/notauthorized");
  }

  if (contact.length === 0) {
    router.push(`/company/` + companyid);
  }

  if (status === "authenticated" && session.user.auth) {
    return (
      <div className="text-center">
        <HeaderBar email={session.user.email} image={session.user.image} />
        <div className="bg-white shadow overflow-hidden sm:rounded-lg float-left m-8 text-left w-2/5">
          <CardHeader
            title="Contact Information"
            subtitle="Edit Contact Information"
          />
          <InputTextBoxLabel
            type="text"
            label="Contact Name"
            id="contactname"
            placeholder="Enter Contact Name"
            value={contactName}
            onChange={(e) => {
              setContactName(e.target.value);
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
            }}
          />
          <InputTextAreaLabel
            rows="5"
            label="Notes"
            id="contactnotes"
            placeholder="Enter Notes"
            value={contactNotes}
            onChange={(e) => {
              setContactNotes(e.target.value);
            }}
          />
          <div className="p-4">
            <ButtonPrimary
              title="Save Contact Information"
              href={`/company/` + companyid}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
            <ButtonDelete
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            />
            <ButtonCancel href={`/company/` + companyid} title="cancel" />
          </div>
        </div>
        <SimpleModal
          dialogtitle="Delete Contact"
          longtext="Are you sure you want to delete this contact?"
          buttontitle="Delete Contact"
          onClickProceed={() => {
            setOpen(false);
            handleDelete();
          }}
          onClickCancel={() => setOpen(false)}
          ref={cancelButtonRef}
          onClose={setOpen}
          show={open}
        />
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
      await fetch("/api/editcontact", {
        body: JSON.stringify({
          contactName,
          contactRole,
          contactEmail,
          contactMobile,
          contactNotes,
          id: contact.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      router.push(`/company/` + companyid);
    }
  }

  async function handleDelete() {
    await fetch("/api/deletecontact", {
      body: JSON.stringify({
        id: contact.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    router.push(`/company/` + companyid);
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let contact = await getContact(context.params.cid, context.params.id, prisma);
  let companyid = context.params.id;
  if (!contact) {
    contact = [];
  } else {
    contact = JSON.parse(JSON.stringify(contact));
  }

  return {
    props: {
      contact,
      companyid,
    },
  };
}
