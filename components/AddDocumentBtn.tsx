"use client";

import { createDocument } from "@/lib/actions/room.actions";
import type { AddDocumentBtnProps } from "@/types/opendocs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddDocumentBtn({ userId, email }: AddDocumentBtnProps) {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room && typeof room === "object" && "id" in room) {
        router.push(`/documents/${(room as { id: string }).id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="button"
      onClick={addDocumentHandler}
      className="gradient-accent flex gap-1 shadow-md"
    >
      <Plus className="size-6 shrink-0" aria-hidden strokeWidth={2} />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
}
