import Link from "next/link";
import InputTextBoxLabel from "./core/InputTextBoxLabel";

const Field = ({ field }) => {
  return (
    <InputTextBoxLabel
      type={field.fieldType}
      label={field.name}
      id={field.code}
      placeholder={field.description}
      //value={}
      onChange={(e) => {
        e.props.dataBack(e.target.value);
      }}
    />
  );
};

export default Field;
