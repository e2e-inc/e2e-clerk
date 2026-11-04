import type { ReactNode } from "react";

export function AccountPanel({
  title,
  titleTestId,
  children,
}: {
  title: string;
  titleTestId?: string;
  children?: ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-e2e-3 py-e2e-8 md:px-e2e-6">
      <section
        aria-labelledby="account-heading"
        className="flex w-full max-w-105 flex-col gap-e2e-4 border border-e2e-neutral-800 bg-e2e-neutral-800/40 p-e2e-3"
      >
        <div className="flex flex-col">
          <p className="type-caption text-e2e-mint">account, read from Clerk on the server</p>
          <h1
            id="account-heading"
            data-testid={titleTestId}
            className="mt-e2e-2 type-body-l wrap-anywhere text-e2e-off-white md:type-body-xl"
          >
            {title}
          </h1>
        </div>
        {children}
      </section>
    </main>
  );
}
