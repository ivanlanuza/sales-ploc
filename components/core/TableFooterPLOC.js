const TableFooterPLOC = ({ datalist }) => {
  var pTotal = 0;
  var lTotal = 0;
  var oTotal = 0;
  var cTotal = 0;
  var i;

  for (i = 0; i < datalist.length; i++) {
    datalist[i].PROSPECT
      ? (pTotal = pTotal + parseInt(datalist[i].PROSPECT))
      : 0;
    datalist[i].LEAD ? (lTotal = lTotal + parseInt(datalist[i].LEAD)) : 0;
    datalist[i].OPPORTUNITY
      ? (oTotal = oTotal + parseInt(datalist[i].OPPORTUNITY))
      : 0;
    datalist[i].CLIENT ? (cTotal = cTotal + parseInt(datalist[i].CLIENT)) : 0;
  }

  return (
    <tr className="border-t border-solid">
      <td className="px-6 py-4 text-center">TOTAL</td>
      <td className="px-6 py-4 text-center font-bold">{pTotal}</td>
      <td className="px-6 py-4 text-center">
        <span className="font-bold">{lTotal}</span>{" "}
        <span className="text-xs text-gray-400 font-light">
          ({Math.round((lTotal / pTotal) * 100, 0)}%)
        </span>
      </td>
      <td className="px-6 py-4 text-center font-bold">
        <span className="font-bold">{oTotal}</span>{" "}
        <span className="text-xs text-gray-400 font-light">
          ({Math.round((oTotal / lTotal) * 100, 0)}%)
        </span>
      </td>
      <td className="px-6 py-4 text-center font-bold">
        <span className="font-bold">{cTotal}</span>{" "}
        <span className="text-xs text-gray-400 font-light">
          ({Math.round((cTotal / oTotal) * 100, 0)}%)
        </span>
      </td>
    </tr>
  );
};

export default TableFooterPLOC;
