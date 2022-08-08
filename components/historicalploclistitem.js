const Data = ({
  data,
  segmentselect,
  businesstypeselect,
  groupbyFilter,
  setOpen,
  setCompanyList,
}) => {
  if (!data) return null;

  async function getCompany(statusId, id, groupbyFilter) {
    fetch(
      "/api/insights/gethistoricalploclist?" +
        new URLSearchParams({
          id: id,
          actiontypeId: statusId,
          groupbyfilter: groupbyFilter,
        }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length != 0) {
          setCompanyList(data);
          setOpen(true);
        }
      });
  }

  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 text-xs font-sans">
      <td className="px-6 py-4">{data.name}</td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() => getCompany("01", data.id, groupbyFilter)}
          className={`text-sm ${
            data.PROSPECT ? "text-purple-600 font-bold " : ""
          }`}
        >
          {data.PROSPECT ? data.PROSPECT : 0}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() => getCompany("02", data.id, groupbyFilter)}
          className={`text-sm ${data.LEAD ? "text-purple-600 font-bold " : ""}`}
        >
          {data.LEAD ? data.LEAD : 0}
        </span>
        <span
          className={`text-sm ${
            data.LEAD ? "text-xs text-gray-400 font-light" : ""
          }`}
        >
          {" "}
          {data.LEAD
            ? "(" + Math.round((data.LEAD / data.PROSPECT) * 100, 0) + "%)"
            : ""}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() => getCompany("03", data.id, groupbyFilter)}
          className={`text-sm ${
            data.OPPORTUNITY ? "text-purple-600 font-bold " : ""
          }`}
        >
          {data.OPPORTUNITY ? data.OPPORTUNITY : 0}
        </span>
        <span
          className={`text-sm ${
            data.OPPORTUNITY ? "text-xs text-gray-400 font-light" : ""
          }`}
        >
          {" "}
          {data.OPPORTUNITY
            ? "(" + Math.round((data.OPPORTUNITY / data.LEAD) * 100, 0) + "%)"
            : ""}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() => getCompany("04", data.id, groupbyFilter)}
          className={`text-sm ${
            data.CLIENT ? "text-purple-600 font-bold " : ""
          }`}
        >
          {data.CLIENT ? data.CLIENT : 0}
        </span>
        <span
          className={`text-sm ${
            data.CLIENT ? "text-xs text-gray-400 font-light" : ""
          }`}
        >
          {" "}
          {data.CLIENT
            ? "(" + Math.round((data.CLIENT / data.OPPORTUNITY) * 100, 0) + "%)"
            : ""}
        </span>
      </td>
    </tr>
  );
};

export default Data;
