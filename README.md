<p align="center">
  <img src="https://ik.imagekit.io/uc8ejfj1j/drop-folder/opendocs-banner_RBtq6GI5B.jpg" alt="OpenDocs banner" width="900" />
</p>

> ### Welcome to **OpenDocs** — a collaborative document workspace built with Next.js. Create and edit rich text in real time, share rooms with fine-grained access, and keep your team in sync with presence, comments, and threads.

## Key features

- **Clerk authentication**  
  Sign-in and sign-up with email-ready flows, protected app routes, and profile avatars integrated across the UI.

- **Real-time collaborative editing**  
  Lexical rich-text powered by Liveblocks: shared cursors, document state, and seamless multi-user sessions.

- **Rooms as documents**  
  Each document is a Liveblocks room with metadata (title, creator); list, open, create, and delete from the dashboard.

- **Sharing and access control**  
  Invite collaborators by email with **editor** or **viewer** roles; server actions validate access before exposing rooms.

- **Rich formatting toolbar**  
  Undo/redo, headings (H1–H3), bold, italic, underline, strikethrough, and text alignment — with a scroll-friendly toolbar on small screens.

- **Comments and threads**  
  Floating composer, threads, and inline discussion via Liveblocks + Lexical plugins.

- **Live presence**  
  See who else is in the document with avatars and collaborator colors.

- **Notifications (home)**  
  In-app notifications surface on the document list for activity you care about.

- **Polished, responsive UI**  
  Tailwind CSS, Radix-style primitives, and a document header tuned for desktop and mobile.

## Editor capabilities

- **Block styles:** Headings **H1**, **H2**, **H3**, and paragraphs; quote blocks are supported in the Lexical theme for rich-text content.
- **Inline marks:** **Bold**, *italic*, underline, strikethrough.
- **Alignment:** Left, center, right, justified.
- **Floating selection toolbar** for quick formatting while you write.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript  
- **Auth:** Clerk (`@clerk/nextjs`)  
- **Collaboration:** Liveblocks (`@liveblocks/react`, `@liveblocks/react-lexical`, `@liveblocks/node`)  
- **Editor:** Lexical (`@lexical/react`, rich-text)  
- **Styling:** Tailwind CSS v4, `tw-animate-css`  
- **UI helpers:** Radix UI primitives, `class-variance-authority`, Lucide icons  

## Installation guide

1. **Clone the repository**

```bash
git clone https://github.com/Gazi2050/OpenDocs.git
cd OpenDocs
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Create `.env.local`**

Copy from `.env.example` and set:

```bash
# Clerk — https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Liveblocks — https://liveblocks.io/dashboard
LIVEBLOCKS_SECRET_KEY=
```

4. **Configure Clerk**

- Create an application in the Clerk dashboard and add your sign-in/sign-up URLs to match this app (defaults: `/sign-in`, `/sign-up`).
- Ensure **User** objects expose `imageUrl` if you use profile images (avatars use `next/image` with `img.clerk.com` allowed in `next.config.ts`).

5. **Configure Liveblocks**

- Create a project and generate a **secret** key; set `LIVEBLOCKS_SECRET_KEY`.
- The app uses the `/api/liveblocks-auth` route with Clerk `currentUser()` for `identifyUser` (user id is the primary email).

6. **Run the development server**

```bash
pnpm dev
```

7. **Build and start for production**

```bash
pnpm build
pnpm start
```

## Notes

- **Access model:** Document access is enforced in `getDocument` and related server actions via `room.usersAccesses` and the signed-in user’s email.
- **Liveblocks:** Room CRUD (create, update title, share, delete) uses `@liveblocks/node` on the server; the browser connects through `LiveblocksProvider` and your auth endpoint.
- **Avatars:** Remote images from Clerk use `next.config.ts` `images.remotePatterns` for `img.clerk.com`.
- **Linting:** `pnpm lint` runs ESLint with the Next.js config.

## License

This project is private unless you add an explicit license file.
