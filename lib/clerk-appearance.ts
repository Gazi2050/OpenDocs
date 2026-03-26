import { dark } from "@clerk/ui/themes";

/**
 * Clerk theme tokens only — layout/surfaces for modals, popovers, and auth are styled in
 * `app/globals.css` (`.cl-*`) so we avoid double-styling `appearance.elements` + CSS.
 */
export const clerkAppearance = {
  theme: dark,
  variables: {
    /* Primary accent: focus rings + primary actions (neutral light on dark shell) */
    colorPrimary: "#d4d4d8",
    fontSize: "16px",
    colorBackground: "var(--card)",
    colorInput: "var(--muted)",
    colorInputForeground: "var(--foreground)",
    colorForeground: "var(--foreground)",
    colorMuted: "color-mix(in oklch, var(--foreground) 8%, transparent)",
    colorMutedForeground: "var(--muted-foreground)",
    colorNeutral: "color-mix(in oklch, var(--foreground) 12%, transparent)",
  },
} as const;
