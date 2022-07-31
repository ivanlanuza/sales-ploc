import prisma from "lib/prisma";
import HeaderBar from "components/headerbar";

import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getCompany, getSegment, getSource, getBusinessType } from "lib/data";

import CardHeader from "components/core/CardHeader";
import InputTextBoxLabel from "components/core/InputTextBoxLabel";
import InputDataLabel from "components/core/InputDataLabel";
import InputSelectLabel from "components/core/InputSelectLabel";
import ButtonPrimary from "components/core/ButtonPrimary";
import ButtonCancel from "components/core/ButtonCancel";
import MessageError from "components/core/MessageError";

export default function CompanyEdit({ company, segment, source, bt }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [companyName, setCompanyName] = useState(company.name);
  const [otherName, setOtherName] = useState(company.other_name);
  const [address, setAddress] = useState(company.address);
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
        <div className="bg-white shadow overflow-hidden sm:rounded-lg float-left m-8 text-left">
          <CardHeader
            title="Company Information"
            subtitle="Edit Company Information"
          />

          <InputTextBoxLabel
            type="text"
            label="Company Name"
            id="companyname"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />

          <InputTextBoxLabel
            type="text"
            label="Legal Entity Name"
            id="legalentityname"
            placeholder="Enter Legal Entity Name"
            value={otherName}
            onChange={(e) => {
              setOtherName(e.target.value);
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
            }}
          />

          <InputSelectLabel
            label="Segment"
            value={segmentSelect}
            data={segment}
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
          />

          <InputSelectLabel
            label="Business Type"
            value={businesstypeSelect}
            data={businesstypelist}
            placeholder="Select a business type"
            onChange={(e) => {
              setBusinessTypeSelect(e.target.value);
              setButtonActive(false);
            }}
          />

          <InputSelectLabel
            label="Source"
            value={sourceSelect}
            data={source}
            onChange={(e) => {
              setSourceSelect(e.target.value);
              setButtonActive(false);
            }}
          />

          <InputDataLabel label="Status" value={company.status.name} />

          <div className="p-4">
            <ButtonPrimary
              title="Save Company Data"
              href={`/company/` + company.id + `/edit`}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
            <ButtonCancel href={`/company/` + company.id} title="cancel" />
          </div>

          {validationerror && (
            <MessageError label="Please fill-up all fields." />
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
          address,
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
