import Google from "next-auth/providers/google";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="text-center">
        <div className="h-14 bg-black pt-2 pr-4">
          <button
            className="border px-8 py-2 ml-4 font-bold rounded-full bg-white text-black border-white float-right"
            onClick={() => signOut()}
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
      </div>
    );
  }
  return (
    <div className="text-center pt-32">
      <button
        className="border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black "
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
