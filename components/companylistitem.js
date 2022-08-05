import Link from "next/link";

const Company = ({ company }) => {
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 text-xs font-sans">
      <td className="px-6 py-4">
        <Link href={`/company/` + company.id}>
          <span className="text-purple-600 hover:text-purple-800 font-bold text-sm transition duration-300 ease-in-out">
            {company.name}
          </span>
        </Link>
      </td>
      <td className="px-6 py-4">{company.status.name}</td>
      <td className="hidden lg:block px-6 py-0">{company.segment.code}</td>
      <td className="hidden lg:block  px-6 py-0">
        {company.businesstype.name}
      </td>
      <td className="hidden lg:block  px-6 py-0">{company.source.name}</td>
    </tr>
  );
};

export default Company;
