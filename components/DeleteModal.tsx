"use client";

import { deleteDocument } from "@/lib/actions/room.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DeleteModalProps } from "@/types/opendocs";
import { CircleAlert, Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteModal({ roomId }: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDocumentHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not delete document.";
      setError(message);
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setError(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="size-12 shrink-0 rounded-md border border-border bg-transparent p-0 text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
        >
          <Trash2 className="size-6" aria-hidden strokeWidth={1.75} />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog overflow-hidden" showCloseButton>
        <DialogHeader className="space-y-3 text-left">
          <CircleAlert
            className="size-12 text-destructive"
            aria-hidden
            strokeWidth={1.75}
          />
          <DialogTitle className="text-lg text-foreground">
            Delete document
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-relaxed text-muted-foreground">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </DialogHeader>

        {/* Inline actions: avoid DialogFooter -mx/-mb which breaks shad-dialog layout */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end sm:gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[8.5rem]"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={deleteDocumentHandler}
            disabled={loading}
            className="gradient-destructive w-full disabled:opacity-60 sm:w-auto sm:min-w-[8.5rem]"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
