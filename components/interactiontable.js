import CardHeader from "./core/CardHeader";
import Interactions from "./interactionlist";

const InteractionTable = ({ interactions, companyid }) => {
  return (
    <div className="block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardHeader
        title="Interaction History"
        subtitle="List of all interactions with the company"
      />

      {interactions.length !== 0 && (
        <table className="w-full font-mono text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Interaction Type
              </th>
              <th scope="col" className="hidden lg:block px-6 py-3">
                Action Data
              </th>
            </tr>
          </thead>
          <tbody>
            <Interactions interactions={interactions} companyid={companyid} />
          </tbody>
        </table>
      )}

      {interactions.length === 0 && (
        <div>
          <table className="w-full border-t border-gray-200 text-sm text-left  text-gray-500 dark:text-gray-400">
            <div className="pl-6 my-4 ">No Interaction History</div>
          </table>
        </div>
      )}
    </div>
  );
};

export default InteractionTable;
