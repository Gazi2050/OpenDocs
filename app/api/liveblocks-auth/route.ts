import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";

export async function POST() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    info: {
      id,
      name: `${firstName ?? ""} ${lastName ?? ""}`.trim() || "User",
      email: emailAddresses[0]?.emailAddress ?? "",
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
