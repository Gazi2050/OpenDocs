"use client";

import NextError from "next/error";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  void error;
  return (
    <html lang="en">
      <body>
        {/* `NextError` requires a `statusCode` prop; App Router does not expose
            status codes for errors — pass 0 for a generic message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
