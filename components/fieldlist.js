import Field from "./fieldlistitem";

const FieldList = ({ fieldlist }) => {
  if (!fieldlist) return null;

  return (
    <>
      {fieldlist.map((field, index) => (
        <Field
          key={index}
          field={field}
          databack={(val) => console.log("mine: " + val)}
        />
      ))}
    </>
  );
};

export default FieldList;
