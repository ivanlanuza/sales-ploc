import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getInteraction } from "lib/data";
import { useState, useRef } from "react";
import InputDatePickerLabel from "components/core/InputDatePickerLabel";
import ButtonPrimary from "components/core/ButtonPrimary";
import ButtonCancel from "components/core/ButtonCancel";
import InputDataLabel from "components/core/InputDataLabel";
import MessageError from "components/core/MessageError";

import prisma from "lib/prisma";
import HeaderBar from "components/headerbar";

import CardHeader from "components/core/CardHeader";

export default function InteractionEdit({ interaction, companyid }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [actionDate, setActionDate] = useState(
    new Date(interaction.businessDate)
  );

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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
        <div className="px-4">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg my-4 float-left text-left w-full xl:w-3/5">
            <CardHeader
              title="Interaction Information"
              subtitle="Edit Interaction Information"
            />
            <InputDataLabel
              label="Interaction Type"
              value={interaction.actiontype.description}
            />
            <InputDatePickerLabel
              selected={actionDate}
              onChange={(date) => setActionDate(date)}
              label="Action Date"
            />
            <div className="p-4">
              <ButtonPrimary
                title="Save Updated Date"
                href={`/company/` + companyid}
                disabled={buttonactive}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
              <ButtonCancel href={`/company/` + companyid} title="cancel" />
            </div>
            {validationerror && (
              <MessageError label="Please fill-up all fields." />
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

    if (!actionDate) {
      errorflag = true;
      setValidationError(true);
    } else {
      await fetch("/api/editinteraction", {
        body: JSON.stringify({
          id: interaction.id,
          businessDate: actionDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      router.push(`/company/` + companyid);
    }
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let interaction = await getInteraction(
    context.params.iid,
    context.params.id,
    prisma
  );
  let companyid = context.params.id;
  if (!interaction) {
    interaction = [];
  } else {
    interaction = JSON.parse(JSON.stringify(interaction[0]));
  }

  return {
    props: {
      interaction,
      companyid,
    },
  };
}
