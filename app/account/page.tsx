import { ClerkLoaded, ClerkLoading, SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import { AccountPanel } from "@/app/account/account-panel";
import { Button, buttonClassName } from "@/components/ui/button";

export default async function AccountPage() {
  const { userId, sessionId } = await auth.protect();
  const user = await currentUser();

  return (
    <AccountPanel title={user?.primaryEmailAddress?.emailAddress ?? "signed in"} titleTestId="account-email">
      <dl className="flex flex-col gap-e2e-2">
        <div className="flex flex-col gap-e2e-half">
          <dt className="type-caption text-e2e-neutral-500">user id</dt>
          <dd data-testid="account-user-id" className="type-code-s wrap-anywhere text-e2e-neutral-300">
            {userId}
          </dd>
        </div>
        <div className="flex flex-col gap-e2e-half">
          <dt className="type-caption text-e2e-neutral-500">session id</dt>
          <dd data-testid="account-session-id" className="type-code-s wrap-anywhere text-e2e-neutral-300">
            {sessionId}
          </dd>
        </div>
      </dl>
      <div className="flex flex-col gap-e2e-2">
        <ClerkLoading>
          <Button disabled className="w-full">
            sign out
          </Button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignOutButton redirectUrl="/">
            <Button className="w-full">sign out</Button>
          </SignOutButton>
        </ClerkLoaded>
        <Link href="/" className={buttonClassName("outline", "w-full")}>
          back to home
        </Link>
      </div>
    </AccountPanel>
  );
}
