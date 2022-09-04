import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import HeaderBar from "components/headerbar";
import CardHeader from "components/core/CardHeader";
import ComboBox from "components/core/ComboBox";
import InputDataLabel from "components/core/InputDataLabel";
import InputSelectLabel from "components/core/InputSelectLabel";
import ButtonPrimary from "components/core/ButtonPrimary";
import InputTextBoxLabel from "components/core/InputTextBoxLabel";
import InputTextAreaLabel from "components/core/InputTextAreaLabel";
import MessageError from "components/core/MessageError";
import MessageSuccess from "components/core/MessageSuccess";
import InputDatePickerLabel from "components/core/InputDatePickerLabel";

import { getSimpleCompanyList } from "lib/data";
import prisma from "lib/prisma";

export default function Entry({ companies }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [companyList, setCompanyList] = useState({ name: "" });
  const [company, setCompany] = useState([]);
  const [actionTypeList, setActionTypeList] = useState([]);
  const [actionType, setActionType] = useState("");
  const [actionFieldList, setActionFieldList] = useState([]);
  const [buttonactive, setButtonActive] = useState(false);
  const [validationerror, setValidationError] = useState(false);
  const [successflag, setSuccessFlag] = useState(false);
  const [actionDate, setActionDate] = useState(new Date());
  const [nextStatus, setNextStatus] = useState();
  const dataArray = [];

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
        <div className="px-4 my-4">
          <div className="bg-white shadow sm:rounded-lg w-full xl:w-3/5 float-left text-left">
            <CardHeader
              title="Create Interaction"
              subtitle="Log a new interaction"
            />

            <ComboBox
              label="Company"
              data={companies}
              value={companyList.name}
              min="0"
              placeholder="Input Company Name"
              onChange={(e) => {
                setCompanyList(e);
                setActionFieldList([]);
                setActionType("");
                retrieveCompanyInfo(e);
                setButtonActive(true);
                setSuccessFlag(false);
              }}
            />
            {company.length != 0 && (
              <div>
                <InputDataLabel label="Status" value={company.status.name} />
                <InputDataLabel
                  label="Segment / Type"
                  value={
                    company.segment.code + ` / ` + company.businesstype.name
                  }
                />
                <InputDatePickerLabel
                  selected={actionDate}
                  onChange={(date) => setActionDate(date)}
                  label="Interaction Date"
                />
                <InputSelectLabel
                  label="Interaction Type"
                  value={actionType}
                  data={actionTypeList}
                  placeholder="Select interaction type"
                  onChange={(e) => {
                    setNextStatus("");
                    setActionType(e.target.value);
                    showActionFields(e.target.value);
                    setButtonActive(true);
                    setSuccessFlag(false);

                    //check if Company's Status needs to be auto-updated based on interaction type
                    let chosenAction = actionTypeList.filter(function (el) {
                      return el.id === e.target.value;
                    });

                    if (chosenAction.length != 0) {
                      if (chosenAction[0].nextstatus) {
                        if (chosenAction[0].nextstatus != company.status.id) {
                          setNextStatus(chosenAction[0].nextstatus);
                        }
                      }
                    }
                  }}
                />
                {actionFieldList.map((input, index) => {
                  return input.fieldType == "textarea"
                    ? actionType && (
                        <InputTextAreaLabel
                          label={input.name}
                          id={input.code}
                          key={input.id}
                          placeholder={input.description}
                          rows="4"
                          onChange={(e) => {
                            setButtonActive(true);
                            setSuccessFlag(false);
                            //Note: Clean up later for better state management
                            actionFieldList[index]["value"] = e.target.value;
                          }}
                        />
                      )
                    : actionType && (
                        <InputTextBoxLabel
                          type={input.fieldType}
                          label={input.name}
                          placeholder={input.description}
                          key={input.id}
                          id={input.code}
                          onChange={(e) => {
                            setButtonActive(true);
                            setSuccessFlag(false);
                            //Note: Clean up later for better state management
                            actionFieldList[index]["value"] = e.target.value;
                          }}
                        />
                      );
                })}
                {actionType && (
                  <div className="p-4">
                    <ButtonPrimary
                      href=""
                      title="Save New Interaction"
                      disabled={!buttonactive}
                      onClick={(e) => {
                        e.preventDefault();
                        setButtonActive(false);
                        createRecords();
                        //console.log("clicked");
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            {validationerror && (
              <MessageError label="Please fill-up all fields." />
            )}
            {successflag && (
              <MessageSuccess
                label={`New Interaction created for ` + companyList.name + `!`}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  async function createRecords() {
    setValidationError(false);

    //used to clean-up the dynamic fields data to be sent for API write
    var i;
    for (i = 0; i < actionFieldList.length; i++) {
      if (actionFieldList[i]["value"] != "") {
        dataArray.push({
          value: actionFieldList[i]["value"],
          fieldId: actionFieldList[i]["id"],
        });
      }
    }

    if (actionFieldList && company.id && actionType && session.user.email) {
      //create api fetch call with combined write
      var notime_actionDate = new Date(
        actionDate.getFullYear(),
        actionDate.getMonth(),
        actionDate.getDate()
      );
      console.log("notime: " + notime_actionDate);
      console.log("actionDate: " + actionDate);

      await fetch("/api/interactioncreate", {
        body: JSON.stringify({
          companyId: company.id,
          actiontypeId: actionType,
          actionData: dataArray,
          createdBy: session.user.id,
          businessDate: notime_actionDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      //Update Company Status to next status if available
      if (nextStatus && nextStatus != "") {
        await fetch("/api/updatecompanystatus", {
          body: JSON.stringify({
            companyid: company.id,
            nextstatus: nextStatus,
            createdBy: session.user.id,
            businessDate: notime_actionDate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
      }

      setSuccessFlag(true);
      setCompany("");
    } else {
      setValidationError(true);
    }
  }

  async function retrieveCompanyInfo(companyquery) {
    if (companyquery.id) {
      fetch(
        "/api/getcompany?" +
          new URLSearchParams({
            id: companyquery.id,
          }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((companyinfo) => {
          setCompany(companyinfo);
          fetch(
            "/api/getactiontypes?" +
              new URLSearchParams({
                id: companyinfo.status.id,
              }),
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
            }
          )
            .then((res) => res.json())
            .then((actiontypes) => {
              var cleanActionTypes = [];
              for (let i = 0; i < actiontypes.length; i++) {
                cleanActionTypes.push({
                  id: actiontypes[i].actionId,
                  name: actiontypes[i].actiontype.description,
                  nextstatus: actiontypes[i].nextStatusId,
                });
              }
              setActionTypeList(cleanActionTypes);
            });
        });
    }
  }

  async function showActionFields(actiontypeid) {
    if (actiontypeid) {
      fetch(
        "/api/getactionfields?" +
          new URLSearchParams({
            id: actiontypeid,
          }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((fieldsinfo) => {
          setActionFieldList(fieldsinfo);
        });
    }
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let companies = await getSimpleCompanyList(prisma);
  companies = JSON.parse(JSON.stringify(companies));

  return {
    props: {
      companies,
    },
  };
}
