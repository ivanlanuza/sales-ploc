import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function entry() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    return <div className="text-center pt-8">Not logged in</div>;
  }

  if (status === "authenticated" && !session.user.auth) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && session.user.auth) {
    return (
      <div className="text-center">
        <div className="h-14 bg-black pt-2 pr-4">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-4 float-right"
            onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          >
            Sign out
          </button>
          <img
            src={session.user.image}
            alt=""
            className="rounded-3xl w-10 float-right border-white border-2 object-center"
          />
          <span className="text-white lowercase text-sm p-2 float-right">
            {session.user.email}
          </span>
        </div>
        <div>Hello!</div>
      </div>
    );
  }
}
