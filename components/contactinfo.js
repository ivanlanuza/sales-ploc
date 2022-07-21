import ContactInfo from "components/contactinfoitem";

const ContactInfoList = ({ contactinfolist, companyid }) => {
  if (!contactinfolist) return null;

  return (
    <>
      {contactinfolist.map((contactinfo, index) => (
        <ContactInfo
          key={index}
          contactinfo={contactinfo}
          companyid={companyid}
        />
      ))}
    </>
  );
};

export default ContactInfoList;
