"use server";

import { clerkClient } from "@clerk/nextjs/server";

import { liveblocks } from "@/lib/liveblocks";
import { getUserColor, parseStringify } from "@/lib/utils";

export async function getClerkUsers({ userIds }: { userIds: string[] }) {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "User",
      email: user.emailAddresses[0]?.emailAddress ?? "",
      avatar: user.imageUrl,
      color: getUserColor(user.id),
    }));

    const sortedUsers = userIds
      .map((email) => users.find((u) => u.email === email))
      .filter(Boolean);

    return parseStringify(sortedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return undefined;
  }
}

export async function getDocumentUsers({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );
      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.error("Error fetching document users:", error);
    return undefined;
  }
}
