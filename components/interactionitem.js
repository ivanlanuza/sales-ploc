import timeago from "lib/timeago";

const Interaction = ({ interaction }) => {
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 text-sm font-mono">
      <td className="px-6 py-4">
        <div className="font-bold">
          {timeago.format(new Date(interaction.businessDate))}
        </div>
        <div className="italic text-xs">by {interaction.user.email}</div>
      </td>
      <td className="px-6 py-4">{interaction.actiontype.description}</td>
      <td className="px-6 py-4">
        {" "}
        {interaction.ActionData.map((data, index) => (
          <div>
            {data.field.name} : {data.value}
          </div>
        ))}
      </td>
    </tr>
  );
};

export default Interaction;
