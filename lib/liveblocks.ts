import { Liveblocks } from "@liveblocks/node";

const secret = process.env.LIVEBLOCKS_SECRET_KEY;

if (!secret) {
  console.warn(
    "LIVEBLOCKS_SECRET_KEY is not set. Liveblocks server actions will fail until it is configured."
  );
}

export const liveblocks = new Liveblocks({
  secret: secret ?? "",
});
