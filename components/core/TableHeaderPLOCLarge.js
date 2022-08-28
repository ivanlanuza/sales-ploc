const TableHeaderPLOCLarge = () => (
  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-6 py-3"></th>
      <th scope="col" className="px-6 py-3 text-center">
        Prospect
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Leads{" "}
        <span className="text-xs text-gray-400 font-light">(Conv. %)</span>
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Opportunity{" "}
        <span className="text-xs text-gray-400 font-light">(Conv. %)</span>
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Client{" "}
        <span className="text-xs text-gray-400 font-light">(Closure %)</span>
      </th>
    </tr>
  </thead>
);

export default TableHeaderPLOCLarge;
