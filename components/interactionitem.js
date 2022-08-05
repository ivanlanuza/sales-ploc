import timeago from "lib/timeago";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/outline";

const Interaction = ({ interaction, companyid }) => {
  const iDate = new Date(interaction.businessDate);
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 text-sm font-sans">
      <td className="px-6 py-2">
        <div className="font-bold">
          <Link
            href={`/company/` + companyid + `/interaction/` + interaction.id}
          >
            <span className="text-purple-600 hover:text-purple-800 text-sm font-bold transition duration-300 ease-in-out">
              {timeago.format(new Date(interaction.businessDate))}
            </span>
          </Link>
        </div>
        <div className="text-xs">{iDate.toDateString()}</div>
        <div className="italic text-xs">{interaction.user.email}</div>
      </td>
      <td className="px-6 py-4">{interaction.actiontype.description}</td>
      <td className="hidden lg:block px-6 py-4">
        {interaction.ActionData.map((data, index) => (
          <div key={index}>
            {data.field.name} : {data.value}
          </div>
        ))}
      </td>
    </tr>
  );
};

export default Interaction;
