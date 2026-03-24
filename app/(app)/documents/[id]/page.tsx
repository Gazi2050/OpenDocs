import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import type { RoomMetadata, User, UserType } from "@/types/livedocs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

function normalizeRoomMetadata(
  metadata: Record<string, unknown>
): RoomMetadata {
  return {
    creatorId: String(metadata.creatorId ?? ""),
    email: String(metadata.email ?? ""),
    title: String(metadata.title ?? "Untitled"),
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    redirect("/sign-in");
  }

  const room = await getDocument({
    roomId: id,
    userId: email,
  });

  if (!room) {
    redirect("/");
  }

  const usersAccesses = room.usersAccesses as Record<string, string[]>;

  const userIds = Object.keys(usersAccesses);
  const users = (await getClerkUsers({ userIds })) as User[];

  const usersData: User[] = users.map((user) => ({
    ...user,
    userType: usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType: UserType = usersAccesses[email]?.includes("room:write")
    ? "editor"
    : "viewer";

  const roomMetadata = normalizeRoomMetadata(
    room.metadata as Record<string, unknown>
  );

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={roomMetadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
}
