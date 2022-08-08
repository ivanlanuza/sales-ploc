import Data from "./historicalploclistitem";

const Datalist = ({ datalist, groupbyFilter, setOpen, setCompanyList }) => {
  if (!datalist) return null;

  return (
    <>
      {datalist.map((data, index) => (
        <Data
          key={index}
          data={data}
          groupbyFilter={groupbyFilter}
          setOpen={setOpen}
          setCompanyList={setCompanyList}
        />
      ))}
    </>
  );
};

export default Datalist;
