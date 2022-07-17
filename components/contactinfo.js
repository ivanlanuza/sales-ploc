import ContactInfo from "components/contactinfoitem";

const ContactInfoList = ({ contactinfolist }) => {
  if (!contactinfolist) return null;

  return (
    <>
      {contactinfolist.map((contactinfo, index) => (
        <ContactInfo key={index} contactinfo={contactinfo} />
      ))}
    </>
  );
};

export default ContactInfoList;
