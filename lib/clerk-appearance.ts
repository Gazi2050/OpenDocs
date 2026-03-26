import { dark } from "@clerk/ui/themes";

/** Matches OpenDocs shell (`globals.css` dark surfaces). */
const shell = "#0c0e11";
const deep = "#050506";
const border = "#27272a";

/**
 * Clerk `UserButton` → Manage account modal, sign-in/up, and popover styling.
 */
export const clerkAppearance = {
  theme: dark,
  variables: {
    colorPrimary: "#a1a1aa",
    fontSize: "16px",
    colorBackground: shell,
    colorInput: deep,
    colorInputForeground: "#f1f5f9",
    colorForeground: "#f8fafc",
    colorMuted: "rgba(148, 163, 184, 0.12)",
    colorMutedForeground: "#94a3b8",
    colorNeutral: "rgba(255, 255, 255, 0.14)",
  },
  elements: {
    modalBackdrop: {
      backgroundColor: "rgba(6, 13, 24, 0.82)",
      backdropFilter: "blur(8px)",
    },
    modalContent: {
      backgroundColor: shell,
      border: `1px solid ${border}`,
      borderRadius: "14px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.72)",
      maxHeight: "min(90vh, 720px)",
      overflow: "hidden",
    },
    modalCloseButton: {
      color: "#e2e8f0",
    },
    navbar: {
      backgroundColor: deep,
      borderRight: `1px solid ${border}`,
    },
    navbarButton: {
      color: "#cbd5e1",
    },
    scrollBox: {
      backgroundColor: shell,
    },
    pageScrollBox: {
      backgroundColor: shell,
    },
    header: {
      backgroundColor: shell,
    },
    headerTitle: {
      color: "#f8fafc",
    },
    headerSubtitle: {
      color: "#94a3b8",
    },
    main: {
      backgroundColor: shell,
    },
    footer: {
      backgroundColor: deep,
      borderTop: `1px solid ${border}`,
    },
    card: {
      backgroundColor: deep,
      border: `1px solid ${border}`,
    },
    profileSection: {
      borderColor: border,
    },
    profileSectionTitleText: {
      color: "#f1f5f9",
    },
    profileSectionSubtitleText: {
      color: "#94a3b8",
    },
    avatarImageActions: {
      gap: "0.5rem",
    },
    avatarImageActionsUpload: {
      color: "#e2e8f0",
      border: "1px solid rgba(148, 163, 184, 0.45)",
      backgroundColor: "rgba(148, 163, 184, 0.1)",
    },
    avatarImageActionsRemove: {
      color: "#f87171",
    },
    badge: {
      color: "#f8fafc",
      backgroundColor: "rgba(63, 63, 70, 0.55)",
      border: "1px solid rgba(161, 161, 170, 0.45)",
    },
    badge__primary: {
      color: "#ffffff",
      backgroundColor: "rgba(63, 63, 70, 0.65)",
      border: "1px solid rgba(161, 161, 170, 0.55)",
    },
    formButtonReset: {
      color: "#cbd5e1",
    },
    identityPreviewText: {
      color: "#e2e8f0",
    },
    userButtonPopoverCard: {
      backgroundColor: shell,
      border: `1px solid ${border}`,
      boxShadow: "0 16px 40px -12px rgba(0, 0, 0, 0.55)",
    },
    userButtonPopoverMain: {
      backgroundColor: shell,
    },
    userButtonPopoverFooter: {
      backgroundColor: deep,
      backgroundImage: "none",
      borderTop: `1px solid ${border}`,
    },
    userButtonPopoverActionButton: {
      color: "#e2e8f0",
    },
    userButtonPopoverActionButtonIcon: {
      color: "#cbd5e1",
    },
    userButtonPopoverActionButtonIconBox: {
      color: "#cbd5e1",
    },
  },
} as const;
