import { AccountPanel } from "@/app/account/account-panel";

export default function AccountLoading() {
  return (
    <AccountPanel title="asking Clerk who you are…">
      <p className="type-body-m text-e2e-neutral-300">one moment.</p>
    </AccountPanel>
  );
}
