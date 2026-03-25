import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="loader">
      <Loader2
        className="size-8 shrink-0 animate-spin text-white"
        aria-hidden
        strokeWidth={2}
      />
      Loading...
    </div>
  );
}
