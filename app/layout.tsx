import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { clerkAppearance } from "@/lib/clerk-appearance";
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
      appearance={clerkAppearance}
    >
      <html
        lang="en"
        className={cn(inter.variable, "h-full antialiased")}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col font-sans">
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
