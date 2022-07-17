const ContactInfo = ({ contactinfo }) => {
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 text-sm">{contactinfo.name}</td>
      <td className="px-6 py-4 text-sm">{contactinfo.role}</td>
      <td className="px-6 py-4 text-sm">{contactinfo.mobile}</td>
      <td className="px-6 py-4 text-sm">{contactinfo.email}</td>
    </tr>
  );
};

export default ContactInfo;
