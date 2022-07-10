import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CompanyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    return <div className="text-center pt-8">Not logged in</div>;
  }

  if (status === "authenticated" && !session.user.auth) {
    router.push("/notauthorized");
  }

  if (status === "authenticated" && session.user.auth) {
    return <div className="text-center pt-32">Welcome!</div>;
  }
}
