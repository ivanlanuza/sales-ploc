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
    <div className="mx-auto w-full font-mono">
      <div className="m-0 flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
        <Link
          href="/interaction/create"
          className="text-base font-bold text-indigo-500 hover:text-indigo-900"
        >
          <span
            className="pl-8 text-indigo-600 font-bold"
            style={{ cursor: "pointer" }}
          >
            New Interaction
          </span>
        </Link>

        <Link
          href="/company/entry"
          className="text-base font-bold text-indigo-500 hover:text-indigo-900"
        >
          <span
            className="pl-8 text-indigo-600 font-bold"
            style={{ cursor: "pointer" }}
          >
            New Company
          </span>
        </Link>

        <Link
          href="/insights/dashboard"
          className="text-base font-bold text-indigo-500 hover:text-indigo-900"
        >
          <span
            className="pl-8 text-indigo-600 font-bold"
            style={{ cursor: "pointer" }}
          >
            Insights
          </span>
        </Link>
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <span className="text-gray-500 lowercase text-sm float-right pr-4">
            {email}
          </span>
          {image && (
            <Image
              height="40"
              width="40"
              src={image}
              alt=""
              className="rounded-3xl w-10 float-right border-gray-200 border-2 object-center"
            />
          )}
          <button
            className="text-gray-900 bg-white border border-indigo-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-4 float-right"
            onClick={() =>
              signOut({
                callbackUrl:
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:3000/"
                    : "https://ploc.iripple.com/",
              })
            }
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
