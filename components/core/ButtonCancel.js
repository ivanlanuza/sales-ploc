import Link from "next/link";

const ButtonCancel = ({ href, title }) => (
  <Link href={href} className="flex  font-sans">
    <span className=" font-sans float-left mr-8 text-sm mt-2 p-1 rounded-sm text-indigo-500 hover:font-bold">
      {title}
    </span>
  </Link>
);

export default ButtonCancel;
