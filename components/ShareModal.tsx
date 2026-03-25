"use client";

import { updateDocumentAccess } from "@/lib/actions/room.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ShareDocumentDialogProps, User, UserType } from "@/types/opendocs";
import { useSelf } from "@liveblocks/react/suspense";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Collaborator from "./Collaborator";
import UserTypeSelector from "./UserTypeSelector";

function selfInfoToUser(
  info: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    color: string;
  } | null
): User {
  if (!info) {
    return {
      id: "",
      name: "",
      email: "",
      avatar: "",
      color: "#3371FF",
    };
  }
  return {
    id: info.id,
    name: info.name,
    email: info.email,
    avatar: info.avatar,
    color: info.color,
  };
}

export default function ShareModal({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) {
  const router = useRouter();
  const self = useSelf();
  const currentUser = selfInfoToUser(self?.info ?? null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");
  const [error, setError] = useState<string | null>(null);

  const shareDocumentHandler = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await updateDocumentAccess({
        roomId,
        email: trimmed,
        userType,
        updatedBy: currentUser,
      });
      if (!result) {
        setError("Could not update access. Try again.");
        return;
      }
      setEmail("");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not update access.";
      setError(message);
    } finally {
      setLoading(false);
    }
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
          type="button"
          className="gradient-blue flex h-9 gap-1 px-4"
          disabled={currentUserType !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog" showCloseButton>
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-muted">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
            />
          </div>
          <Button
            type="button"
            onClick={shareDocumentHandler}
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={currentUser}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
