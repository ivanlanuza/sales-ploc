import { signOut } from "next-auth/react";
import { Fragment } from "react";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  MenuIcon,
  XIcon,
  CollectionIcon,
  BriefcaseIcon,
  ChatAlt2Icon,
  PlusIcon,
  ChartBarIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const companies = [
  {
    name: "New Interaction",
    description: "Log an interaction with a company",
    href: "/interaction/create",
    icon: ChatAlt2Icon,
  },
  {
    name: "New Company",
    description: "Add a new company into the database.",
    href: "/company/entry",
    icon: BriefcaseIcon,
  },
  {
    name: "Company Directory",
    description: "View list of all companies",
    href: "/company/list",
    icon: CollectionIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderBar({ email, image }) {
  return (
    <div className="flex py-4 font-sans border-b-2 border-gray-100">
      <div className="flex-none">
        <Link
          href="/interaction/create"
          className="text-base font-bold text-indigo-500 hover:text-indigo-900"
        >
          <div className="float-left">
            <ChatAlt2Icon
              style={{ cursor: "pointer" }}
              className="h-8 w-8 text-indigo-600 border-indigo-600 rounded-md p-1 border-2 mr-0 ml-8 float-left"
            />
            <span
              className="hidden lg:block pl-1 pt-1 text-indigo-600 font-bold float-left"
              style={{ cursor: "pointer" }}
            >
              New Interaction
            </span>
          </div>
        </Link>

        <Link
          href="/company/entry"
          className="text-base font-bold text-indigo-500 hover:text-indigo-900"
        >
          <div className="float-left">
            <BriefcaseIcon
              style={{ cursor: "pointer" }}
              className="h-8 w-8 text-indigo-600 border-indigo-600 rounded-md p-1 border-2 mr-0 ml-8 float-left"
            />
            <span
              className="hidden lg:block pl-1 pt-1 text-indigo-600 font-bold float-left"
              style={{ cursor: "pointer" }}
            >
              New Company
            </span>
          </div>
        </Link>

        <Link
          href="/insights/dashboard"
          className="text-base font-bold text-indigo-500 hover:text-indigo-900"
        >
          <div className="float-left">
            <ChartBarIcon
              style={{ cursor: "pointer" }}
              className="h-8 w-8 text-indigo-600 border-indigo-600 rounded-md p-1 border-2 border-solid mr-0 ml-8 float-left"
            />
            <span
              className="hidden lg:block pl-1 pt-1 text-indigo-600 font-bold float-left"
              style={{ cursor: "pointer" }}
            >
              Insights
            </span>
          </div>
        </Link>
      </div>
      <div className="grow"></div>
      <div className="flex-none">
        <div className="float-right">
          <LogoutIcon
            style={{ cursor: "pointer" }}
            className="h-8 w-8 text-indigo-600 border-indigo-600 rounded-md p-1 border-2 ml-2 mr-4"
            onClick={() =>
              signOut({
                callbackUrl:
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:3000/"
                    : "https://ploc.iripple.com/",
              })
            }
          />
        </div>

        <div className="hidden lg:block float-right mr-4">
          {image && (
            <Image
              height="32"
              width="32"
              src={image}
              alt=""
              className=" rounded-3xl w-10 border-gray-200 border-2 mt-4"
            />
          )}
        </div>
        <span className="hidden lg:block float-right text-gray-500 lowercase text-sm pt-2 pr-4">
          {email}
        </span>
      </div>
    </div>
  );
}
