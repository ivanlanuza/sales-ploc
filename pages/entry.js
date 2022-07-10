import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderBar from "components/headerbar";

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
        <HeaderBar email={session.user.email} image={session.user.image} />
        <div>Hello!</div>
      </div>
    );
  }
}
