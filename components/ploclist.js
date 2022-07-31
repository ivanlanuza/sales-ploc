import Data from "./ploclistitem";

const Datalist = ({
  datalist,
  segmentselect,
  businesstypeselect,
  groupbyFilter,
  setOpen,
  setCompanyList,
}) => {
  if (!datalist) return null;

  //console.log("gbF: " + groupbyFilter);
  return (
    <>
      {datalist.map((data, index) => (
        <Data
          key={index}
          data={data}
          segmentselect={segmentselect}
          businesstypeselect={businesstypeselect}
          groupbyFilter={groupbyFilter}
          setOpen={setOpen}
          setCompanyList={setCompanyList}
        />
      ))}
    </>
  );
};

export default Datalist;
