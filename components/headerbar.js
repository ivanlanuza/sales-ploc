import { signOut } from "next-auth/react";

const HeaderBar = ({ email, image }) => {
  return (
    <nav className="h-16 pt-3 bg-blue-700 text-white hover:text-gray-700 focus:text-gray-700 shadow-lg font-mono">
      <div className="float-left pt-2">
        <a
          className="text-md text-white font-semibold font-mono pl-4 pr-8"
          href="/entry"
        >
          Actions
        </a>
        <a
          className="text-md text-white font-semibold font-mono pl-4 pr-8"
          href="/company"
        >
          Companies
        </a>
        <a
          className="text-md text-white font-semibold font-mono pl-4 pr-8"
          href="/insights"
        >
          Insights
        </a>
      </div>
      <div className="flex items-center relative float-right pt-0">
        <span className="text-white lowercase text-sm float-right pr-4">
          {email}
        </span>
        <img
          src={image}
          alt=""
          className="rounded-3xl w-10 float-right border-white border-2 object-center mr-2"
        />
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-4 float-right"
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default HeaderBar;
