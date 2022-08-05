const Data = ({
  data,
  segmentselect,
  businesstypeselect,
  groupbyFilter,
  setOpen,
  setCompanyList,
}) => {
  if (!data) return null;

  async function getCompany(
    companyStatusId,
    statusId,
    id,
    segmentselect,
    businesstypeselect,
    groupbyFilter
  ) {
    fetch(
      "/api/insights/getcompanyfromreports?" +
        new URLSearchParams({
          segmentId: segmentselect,
          businesstypeId: businesstypeselect,
          id: id,
          actiontypeId: statusId,
          groupbyfilter: groupbyFilter,
          companyStatusId,
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
          onClick={() =>
            getCompany(
              "1",
              "01",
              data.id,
              segmentselect,
              businesstypeselect,
              groupbyFilter
            )
          }
          className={`text-sm ${
            data.PROSPECT ? "text-purple-600 font-bold " : ""
          }`}
        >
          {data.PROSPECT ? data.PROSPECT : 0}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() =>
            getCompany(
              "2",
              "02",
              data.id,
              segmentselect,
              businesstypeselect,
              groupbyFilter
            )
          }
          className={`text-sm ${data.LEAD ? "text-purple-600 font-bold " : ""}`}
        >
          {data.LEAD ? data.LEAD : 0}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() =>
            getCompany(
              "3",
              "03",
              data.id,
              segmentselect,
              businesstypeselect,
              groupbyFilter
            )
          }
          className={`text-sm ${
            data.OPPORTUNITY ? "text-purple-600 font-bold " : ""
          }`}
        >
          {data.OPPORTUNITY ? data.OPPORTUNITY : 0}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          onClick={() =>
            getCompany(
              "4",
              "04",
              data.id,
              segmentselect,
              businesstypeselect,
              groupbyFilter
            )
          }
          className={`text-sm ${
            data.CLIENT ? "text-purple-600 font-bold " : ""
          }`}
        >
          {data.CLIENT ? data.CLIENT : 0}
        </span>
      </td>
    </tr>
  );
};

export default Data;
