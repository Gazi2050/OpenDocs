<p align="center">
  <img src="https://ik.imagekit.io/uc8ejfj1j/drop-folder/Screenshot_from_2026-03-27_15-52-00_uwydghgVI.png" alt="OpenDocs banner" width="900" />
</p>

> ### Welcome to **OpenDocs** — a collaborative document workspace. Create and edit rich text in real time, share with fine-grained access, and keep your team in sync with presence, comments, and threads.

## 🔑 Key features

- 🔐 **Secure authentication**  
  Sign-in and sign-up, protected routes, and profile avatars across the app.

- ⚡ **Real-time collaborative editing**  
  Shared cursors, live document state, and seamless multi-user sessions.

- 📄 **Documents you can manage**  
  Every file is a collaborative room with a title and owner; list, open, create, and delete from your dashboard.

- 🤝 **Sharing and access control**  
  Invite people by email as **editors** or **viewers**; access is checked before anyone opens a room.

- 🎨 **Rich formatting toolbar**  
  Undo/redo, headings (H1–H3), bold, italic, underline, strikethrough, and text alignment — including a scroll-friendly bar on small screens.

- 💬 **Comments and threads**  
  Floating composer, threads, and inline discussion on the canvas.

- 👥 **Live presence**  
  See who else is in the document with avatars and colors.

- 🔔 **Notifications (home)**  
  Activity surfaces on the document list.

- 📱 **Responsive layout**  
  Works on desktop and mobile, including a document header tuned for both.

## 📝 Editor capabilities

- 📐 **Block styles:** Headings **H1**, **H2**, **H3**, and paragraphs; styled quote blocks when present in content.
- ✍️ **Inline marks:** **Bold**, *italic*, underline, strikethrough.
- ↔️ **Alignment:** Left, center, right, justified.
- 🎯 **Floating selection toolbar** for quick formatting while you write.

## 🛠️ Installation guide

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
# Clerk — dashboard keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<publishable_key>
CLERK_SECRET_KEY=<secret_key>

# Liveblocks — dashboard keys
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=<public_api_key>
LIVEBLOCKS_SECRET_KEY=<secret_key>
```

4. **Run the development server**

```bash
pnpm dev
```

5. **Build and start for production**

```bash
pnpm build
pnpm start
```

## ℹ️ Notes

- 🖊️ **Roles:** **Editors** can change the text and layout; **viewers** can open the document and follow along but not edit.
- ✉️ **Sharing:** People only appear in a document after someone with access invites them by email—your list on the home page is the rooms you’re allowed to use.
- 🔄 **In the room:** Edits and cursors update live for everyone there, and you can leave comments and threads tied to the content while you work.

## 🎨 Design

- 🖼️ [Figma Design](https://www.figma.com/design/VQIupNHKq3dlhESi9IpA5F/OpenDocs---design?node-id=2-2&p=f)