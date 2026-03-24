import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Provider from "./Provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenDocs",
  description: "Collaborative documents",
};

/** Must match `app/(auth)/sign-in` and `app/(auth)/sign-up` routes. */
const signInUrl = "/sign-in";
const signUpUrl = "/sign-up";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#3371FF",
          fontSize: "16px",
        },
      }}
    >
      <html lang="en" className={cn(inter.variable, "h-full antialiased")} suppressHydrationWarning>
        <body className="min-h-full flex flex-col font-sans">
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
