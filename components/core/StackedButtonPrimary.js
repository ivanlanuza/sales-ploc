import Link from "next/link";

const StackedButtonPrimary = ({ href, title, onClick, disabled }) => (
  <Link href={href}>
    <button
      type="submit"
      disabled={disabled}
      className="
      font-sans
        w-full
        px-6
        py-3.5
        text-white bg-indigo-600
        font-medium
        text-sm
        leading-tight
        uppercase
        rounded
        shadow-md
        mb-2
        mt-4
        hover:bg-indigo-700 hover:shadow-lg
        focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-indigo-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
      onClick={onClick}
    >
      {title}
    </button>
  </Link>
);

export default StackedButtonPrimary;
