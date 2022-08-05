import Link from "next/link";

const ContactInfo = ({ contactinfo, companyid }) => {
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 font-sans">
      <td className="px-6 py-4 text-xs">
        <Link
          href={
            `/company/` + companyid + `/contact/` + contactinfo.id + `/edit`
          }
        >
          <span className="text-purple-600 hover:text-purple-800 text-sm font-bold transition duration-300 ease-in-out">
            {contactinfo.name}
          </span>
        </Link>
      </td>
      <td className="px-6 py-4 text-xs">{contactinfo.role}</td>
      <td className="hidden lg:block px-6 py-0 pt-2 text-xs">
        {contactinfo.mobile}
      </td>
      <td className="hidden lg:block px-6 py-0 text-xs">{contactinfo.email}</td>
    </tr>
  );
};

export default ContactInfo;
