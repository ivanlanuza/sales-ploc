import timeago from "lib/timeago";
import Link from "next/link";

const RecoActionItem = ({ recoaction, status }) => {
  const curr_date = new Date();
  const last_date = new Date(recoaction.last_contact);
  const opp_date = new Date(recoaction.opp_date);
  const since_last = Math.ceil(
    (curr_date.getTime() - last_date.getTime()) / (1000 * 3600 * 24)
  );
  const since_opp = Math.ceil(
    (curr_date.getTime() - opp_date.getTime()) / (1000 * 3600 * 24)
  );

  const followup_count = recoaction.interactions - 2;
  var recotext = "";

  if (since_last < 8) {
    recotext = "Wait a few days.";
  } else {
    if (followup_count < 6) {
      recotext = "Do another follow-up.";
    } else {
      if (since_opp < 60) {
        if (status === "Opp") {
          recotext = "Offer Time-limited Discount.";
        } else {
          recotext = "Ask if they want a proposal";
        }
      } else {
        recotext = "Consider Marking as Lost.";
      }
    }
  }
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 text-sm font-sans">
      <td className="px-6 py-2">
        <div className="font-bold">
          <Link href={`/company/` + recoaction.companyId}>
            <span className="text-purple-600 hover:text-purple-800 text-sm font-bold transition duration-300 ease-in-out">
              {recoaction.name}
            </span>
          </Link>
        </div>
      </td>
      <td className="text-xs text-left">{recoaction.code}</td>
      <td className="text-xs text-left">
        {timeago.format(new Date(recoaction.opp_date))}
      </td>
      <td className="text-xs text-left">
        {timeago.format(new Date(recoaction.last_contact))}
      </td>
      <td className="text-xs text-left">{recoaction.interactions - 2}</td>
      <td className="text-xs text-left">{recotext}</td>
    </tr>
  );
};

export default RecoActionItem;

//{timeago.format(new Date(recoaction.opp_date))}
