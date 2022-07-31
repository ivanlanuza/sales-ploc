import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import prisma from "lib/prisma";
import { getSegment, getSource, getBusinessType } from "lib/data.js";

import HeaderBar from "components/headerbar";
import CardHeader from "components/core/CardHeader";
import InputTextBoxLabel from "components/core/InputTextBoxLabel";
import InputSelectLabel from "components/core/InputSelectLabel";
import ButtonPrimary from "components/core/ButtonPrimary";
import MessageError from "components/core/MessageError";
import MessageSuccess from "components/core/MessageSuccess";
import InputDatePickerLabel from "components/core/InputDatePickerLabel";

export default function CompanyPage({ segment, source, bt }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [address, setAddress] = useState("");

  const [segmentSelect, setSegmentSelect] = useState("");
  const [businesstypeSelect, setBusinessTypeSelect] = useState("");
  const [sourceSelect, setSourceSelect] = useState("");
  const [businesstypelist, setBusinessTypeList] = useState(bt);

  const [validationerror, setValidationError] = useState(false);
  const [successflag, setSuccessFlag] = useState(false);
  const [buttonactive, setButtonActive] = useState(false);
  const [actionDate, setActionDate] = useState(new Date());

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
              title="Create Company"
              subtitle="Add a new company record"
            />
            <InputTextBoxLabel
              type="text"
              label="Company Name"
              id="companyname"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setButtonActive(false);
                setSuccessFlag(false);
              }}
            />
            <InputTextBoxLabel
              type="text"
              label="L.E. Name"
              id="lename"
              placeholder="Enter Legal Entity Name"
              value={otherName}
              onChange={(e) => {
                setOtherName(e.target.value);
                setButtonActive(false);
                setSuccessFlag(false);
              }}
            />
            <InputTextBoxLabel
              type="text"
              label="Business Address"
              id="address"
              placeholder="Enter Business Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setButtonActive(false);
                setSuccessFlag(false);
              }}
            />

            <InputSelectLabel
              label="Segment"
              value={segmentSelect}
              data={segment}
              placeholder="Select a segment"
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
            />
            <InputSelectLabel
              label="Business Type"
              value={businesstypeSelect}
              data={businesstypelist}
              placeholder="Select a business type"
              onChange={(e) => {
                setBusinessTypeSelect(e.target.value);
                setButtonActive(false);
                setSuccessFlag(false);
              }}
            />
            <InputSelectLabel
              label="Source"
              value={sourceSelect}
              data={source}
              placeholder="Select a source"
              onChange={(e) => {
                setSourceSelect(e.target.value);
                setButtonActive(false);
                setSuccessFlag(false);
              }}
            />
            <InputDatePickerLabel
              selected={actionDate}
              onChange={(date) => setActionDate(date)}
              label="Registration Date"
            />
            <div className="p-4">
              <ButtonPrimary
                title="Create New Company"
                disabled={buttonactive}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            </div>
            {validationerror && (
              <MessageError label="Please fill-up all fields." />
            )}

            {successflag && (
              <MessageSuccess label="New Company record created!" />
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
      !actionDate ||
      actionDate === "" ||
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
          createdBy: session.user.id,
          actionDate,
          address,
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
      setAddress("");
      setSourceSelect("");
      setActionDate(new Date());
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
