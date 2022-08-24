import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import HeaderBar from "components/headerbar";
import BannerHero from "components/bannerhero";

/* This example requires Tailwind CSS v2.0+ */
import {
  LightningBoltIcon,
  MapIcon,
  AnnotationIcon,
  CalendarIcon,
  OfficeBuildingIcon,
  PhoneOutgoingIcon,
  TemplateIcon,
  SearchCircleIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Company Directory",
    description: "Display all companies in the database.",
    icon: ClipboardListIcon,
    href: "/company/list",
  },
  {
    name: "PLOC Current Snapshot",
    description: "View the current PLOC pipeline.",
    icon: OfficeBuildingIcon,
    href: "/insights/plocsnapshot",
  },
  {
    name: "Historical PLOC by Source",
    description: "Know the sources that drive most return.",
    icon: SearchCircleIcon,
    href: "/insights/plocbysource",
  },
  {
    name: "Historical PLOC Conversion Rates",
    description: "View conversion and closure rates.",
    icon: ClipboardListIcon,
    href: "/insights/plocconversion",
  },
  {
    name: "PLOC Monthly Scorecard",
    description: "View monthly PLOC scores.",
    icon: CalendarIcon,
    href: "/insights/plocmonthlyscorecard",
  },

  /*{
    name: "[SOON!] Timeline Update",
    description: "Review activity details per day.",
    icon: ClipboardListIcon,
    href: "#",
  },
  {
    name: "[COMING SOON!] Summarized PLOC Worksheet",
    description: "Have a full view of your prospect base.",
    icon: TemplateIcon,
    href: "#",
  },
  {
    name: "Next Best Actions",
    description: "Get prescriptions on what to do next.",
    icon: LightningBoltIcon,
    href: "#",
  },


  {
    name: "PLOC based on Interactions",
    description: "Track your PLOC scorecard based on interactions.",
    icon: PhoneOutgoingIcon,
    href: "#",
  },
  {
    name: "Interactions List",
    description: "Review all the interactions made recently.",
    icon: AnnotationIcon,
    href: "#",
  },
  {
    name: "Daily Activities Scorecard",
    description: "Check trends of day-to-day activities.",
    icon: CalendarIcon,
    href: "#",
  },*/
];

export default function Example() {
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
      <div className="w-full font-sans">
        <HeaderBar email={session.user.email} image={session.user.image} />
        <div className="py-12 bg-white pb-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerHero
              subtitle="Insights for P.L.O.C."
              title="Improve the Sales Cycle"
              description="Get prescriptions for Next Best Action, see patterns in the Customer Funnel, and get insights on how to improve sales closure rate."
            />
            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <Link href={feature.href} key={feature.name}>
                    <div
                      key={feature.name}
                      className="relative"
                      style={{ cursor: "pointer" }}
                    >
                      <dt>
                        <div className="absolute flex items-center mt-1 justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <feature.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-bold text-gray-900">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-1 ml-16 text-sm lg:text-base text-gray-500">
                        {feature.description}
                      </dd>
                    </div>
                  </Link>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
