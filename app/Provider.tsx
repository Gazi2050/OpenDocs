"use client";

import { useUser } from "@clerk/nextjs";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react/suspense";
import type { ReactNode } from "react";

import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";

export default function Provider({ children }: { children: ReactNode }) {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users ?? [];
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const email = clerkUser?.emailAddresses[0]?.emailAddress;
        if (!email) {
          return [];
        }
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: email,
          text,
        });
        return roomUsers ?? [];
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
