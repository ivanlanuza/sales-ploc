import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="text-center pt-32">
      Sorry you are not authorized. Please contact the administrator first to
      give you access - then try again.
      <div className="text-center pt-8">
        <button
          className="border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black "
          onClick={() =>
            signOut({
              callbackUrl:
                process.env.NODE_ENV === "development"
                  ? "http://localhost:3000/"
                  : "https://ploc.iripple.com/",
            })
          }
        >
          Try logging in again
        </button>
      </div>
    </div>
  );
}
