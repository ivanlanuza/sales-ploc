const RecoActionsTableHeader = ({ tablestatus }) => (
  <>
    {tablestatus == "Opp" && (
      <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 text-left">
            <span className="text-left">Company</span>
          </th>
          <th scope="col" className="ml-2 py-3 text-left">
            <span className="mr-8 text-left">Segment</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Opportunity Date</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Last Contact</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Follow-ups</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Recommendation</span>
          </th>
        </tr>
      </thead>
    )}

    {tablestatus == "Lead" && (
      <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 text-left">
            <span className="text-left">Company</span>
          </th>
          <th scope="col" className="ml-2 py-3 text-left">
            <span className="mr-8 text-left">Segment</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Lead Date</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Last Contact</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Follow-ups</span>
          </th>
          <th scope="col" className="py-3 text-left">
            <span className="mr-8 text-left">Recommendation</span>
          </th>
        </tr>
      </thead>
    )}
  </>
);

export default RecoActionsTableHeader;
