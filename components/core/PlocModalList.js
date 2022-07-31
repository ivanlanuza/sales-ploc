import Company from "./PlocModalListItem";

const Companies = ({ companies }) => {
  if (!companies) return null;

  return (
    <>
      {companies.map((company, index) => (
        <Company key={index} company={company} />
      ))}
    </>
  );
};

export default Companies;
