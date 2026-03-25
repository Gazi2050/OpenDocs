"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { liveblocks } from "@/lib/liveblocks";
import { getAccessType, parseStringify } from "@/lib/utils";
import type { CreateDocumentParams, ShareDocumentParams } from "@/types/opendocs";

export async function createDocument({ userId, email }: CreateDocumentParams) {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses: {
        [email]: ["room:write"],
      },
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.error("Error creating room:", error);
    return undefined;
  }
}

export async function getDocument({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You do not have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.error("Error getting room:", error);
    return undefined;
  }
}

export async function updateDocument(roomId: string, title: string) {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    return undefined;
  }
}

export async function getDocuments(email: string) {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.error("Error getting rooms:", error);
    return undefined;
  }
}

export async function updateDocumentAccess({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) {
  try {
    const access = getAccessType(userType);

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: access,
      },
    });

    if (room) {
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: "$documentAccess",
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email,
        },
        roomId,
      });
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.error("Error updating room access:", error);
    return undefined;
  }
}

export async function removeCollaborator({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) {
  try {
    const room = await liveblocks.getRoom(roomId);

    const creatorEmail = String(room.metadata.email ?? "");
    if (creatorEmail === email) {
      throw new Error("The document owner cannot be removed from the document");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("document owner")
    ) {
      throw error;
    }
    console.error("Error removing collaborator:", error);
    return undefined;
  }
}

export async function deleteDocument(roomId: string) {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error instanceof Error
      ? error
      : new Error("Could not delete document.");
  }
}
