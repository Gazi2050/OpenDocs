"use client";

import { removeCollaborator, updateDocumentAccess } from "@/lib/actions/room.actions";
import type { CollaboratorProps, UserType } from "@/types/opendocs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import UserTypeSelector from "./UserTypeSelector";

export default function Collaborator({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType ?? "viewer"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateDocumentAccess({
        roomId,
        email,
        userType: type as UserType,
        updatedBy: user,
      });
      if (!result) {
        setError("Could not update role.");
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update role.");
    } finally {
      setLoading(false);
    }
  };

  const removeCollaboratorHandler = async (targetEmail: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await removeCollaborator({ roomId, email: targetEmail });
      if (!result) {
        setError("Could not remove collaborator.");
        return;
      }
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not remove collaborator."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-muted-soft">
              {loading && "updating..."}
            </span>
          </p>
          {error ? (
            <p className="text-xs text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <p className="text-sm font-light text-muted-soft">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-muted-soft">Owner</p>
      ) : (
        <div className="flex items-center gap-2">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            variant="ghost"
            className="remove-btn"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
}
