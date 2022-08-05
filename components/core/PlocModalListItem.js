import Link from "next/link";

const Company = ({ company }) => {
  return (
    <tr className="text-xs font-sans">
      <td className="px-6 py-1">
        <Link href={`/company/` + company.id}>
          <span className="text-purple-600 hover:text-purple-800 font-bold text-sm transition duration-300 ease-in-out">
            {company.name}
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default Company;
