import AddDocumentBtn from "@/components/AddDocumentBtn";
import { DeleteModal } from "@/components/DeleteModal";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type RoomListItem = {
  id: string;
  createdAt: string | Date;
  metadata: Record<string, string | string[] | undefined>;
};

function createdAtToIso(value: string | Date): string {
  return typeof value === "string" ? value : value.toISOString();
}

export default async function HomePage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    redirect("/sign-in");
  }

  const roomDocuments = await getDocuments(email);
  const rooms: RoomListItem[] = roomDocuments?.data ?? [];

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <UserButton />
        </div>
      </Header>

      {rooms.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn userId={clerkUser.id} email={email} />
          </div>
          <ul className="document-ul">
            {rooms.map(({ id, metadata, createdAt }) => {
              const title =
                typeof metadata.title === "string"
                  ? metadata.title
                  : "Untitled";
              return (
                <li key={id} className="document-list-item">
                  <Link
                    href={`/documents/${id}`}
                    className="flex flex-1 items-center gap-4"
                  >
                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                      <FileText
                        className="size-10 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">{title}</p>
                      <p className="text-sm font-light text-muted-foreground">
                        Created about {dateConverter(createdAtToIso(createdAt))}
                      </p>
                    </div>
                  </Link>
                  <DeleteModal roomId={id} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <FileText
            className="mx-auto size-10 text-muted-foreground"
            aria-hidden="true"
          />
          <AddDocumentBtn userId={clerkUser.id} email={email} />
        </div>
      )}
    </main>
  );
}
