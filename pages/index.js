import Google from "next-auth/providers/google";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/entry");
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
