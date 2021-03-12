import * as React from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import { signInUrl } from "../appSettings";

export const UnauthenticatedRedirecter: React.FC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return;
    if (router.pathname === signInUrl) return;
    if (!session) signIn().catch(console.error);
  }, [loading, router.pathname, session]);

  if (loading || (!session && router.pathname !== signInUrl))
    return <>loading session...</>;
  return <>{children || null}</>;
};
