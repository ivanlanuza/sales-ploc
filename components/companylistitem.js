import Link from "next/link";

const Company = ({ company }) => {
  return (
    <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <Link href={`/company/` + company.id}>
          <span className="text-purple-600 hover:text-purple-800 font-bold transition duration-300 ease-in-out  font-mono">
            {company.name}
          </span>
        </Link>
      </td>
      <td className="px-6 py-4">{company.status.code}</td>
      <td className="px-6 py-4">{company.segment.code}</td>
      <td className="px-6 py-4">{company.businesstype.name}</td>
      <td className="px-6 py-4">{company.source.name}</td>
    </tr>
  );
};

export default Company;
