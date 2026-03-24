import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <main className="home-container">
      <div className="document-list-title flex w-full max-w-[730px] items-center justify-between px-5 pt-10">
        <h1 className="text-28-semibold">OpenDocs</h1>
        <UserButton />
      </div>
      <p className="px-5 text-center text-blue-muted">
        {user?.emailAddresses[0]?.emailAddress
          ? `Signed in as ${user.emailAddresses[0].emailAddress}`
          : "Signed in"}
      </p>
    </main>
  );
}
