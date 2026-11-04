import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";

import { Button, buttonClassName } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-e2e-3 py-e2e-8 md:px-e2e-6">
      <div className="flex w-full max-w-105 flex-col gap-e2e-3">
        <section aria-labelledby="home-heading" className="border border-e2e-neutral-800 bg-e2e-neutral-800/40">
          <div className="flex flex-col gap-e2e-4 p-e2e-3">
            <Suspense fallback={<Intro title="sign in" text="checking your session with Clerk…" />}>
              <SessionActions />
            </Suspense>
          </div>
          <div className="flex flex-col gap-e2e-2 border-t border-e2e-neutral-800 p-e2e-3">
            <h2 className="type-caption text-e2e-neutral-500">test mode</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-e2e-3 gap-y-e2e-1 type-code-s">
              <dt className="text-e2e-neutral-500">email</dt>
              <dd className="text-e2e-neutral-300">you+clerk_test@example.com</dd>
              <dt className="text-e2e-neutral-500">code</dt>
              <dd className="text-e2e-neutral-300">424242</dd>
            </dl>
          </div>
        </section>
        <p className="text-center type-body-s text-e2e-neutral-500">
          both buttons lead to accounts.dev, Clerk&apos;s hosted page.
        </p>
      </div>
    </main>
  );
}

async function SessionActions() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <>
        <Intro title="sign in" text="use a password, an email code, or Google." />
        <div className="flex flex-col gap-e2e-2">
          {/* Disabled until Clerk has loaded, so an early click isn't lost. */}
          <ClerkLoading>
            <Button disabled className="w-full">
              sign in
            </Button>
            <Button variant="outline" disabled className="w-full">
              create account
            </Button>
          </ClerkLoading>
          <ClerkLoaded>
            <SignInButton forceRedirectUrl="/account" signUpForceRedirectUrl="/account">
              <Button className="w-full">sign in</Button>
            </SignInButton>
            <SignUpButton forceRedirectUrl="/account" signInForceRedirectUrl="/account">
              <Button variant="outline" className="w-full">
                create account
              </Button>
            </SignUpButton>
          </ClerkLoaded>
        </div>
      </>
    );
  }

  const user = await currentUser();
  return (
    <>
      <Intro title="signed in" text={`as ${user?.primaryEmailAddress?.emailAddress ?? "you"}.`} />
      <Link href="/account" className={buttonClassName("primary", "w-full")}>
        open account
      </Link>
    </>
  );
}

function Intro({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col">
      <p className="type-caption text-e2e-mint">Clerk sign-in, tested end to end</p>
      <h1 id="home-heading" className="mt-e2e-2 type-h2 text-e2e-off-white">
        {title}
      </h1>
      <p className="mt-e2e-2 type-body-m text-e2e-neutral-300">{text}</p>
    </div>
  );
}
