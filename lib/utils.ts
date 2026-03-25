import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { UserType } from "@/types/opendocs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T

export const getAccessType = (userType: UserType): AccessTypeTuple => {
  switch (userType) {
    case "creator":
    case "editor":
      return ["room:write"]
    case "viewer":
      return ["room:read", "room:presence:write"]
    default:
      return ["room:read", "room:presence:write"]
  }
}

type AccessTypeTuple =
  | ["room:write"]
  | ["room:read", "room:presence:write"]

export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000)
  const date = new Date(timestampNum * 1000)
  const now = new Date()

  const diff = now.getTime() - date.getTime()
  const diffInSeconds = diff / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24

  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`
    case diffInDays >= 1 && diffInDays <= 7:
      return `${Math.floor(diffInDays)} days ago`
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`
    default:
      return "Just now"
  }
}

export const brightColors = [
  "#2E8B57",
  "#FF6EB4",
  "#00CDCD",
  "#FF00FF",
  "#FF007F",
  "#FFD700",
  "#00CED1",
  "#FF1493",
  "#FF7F50",
  "#9ACD32",
  "#FFA500",
  "#32CD32",
  "#ADFF2F",
  "#DB7093",
  "#00FF7F",
  "#FF6347",
]

export function getUserColor(userId: string): string {
  let sum = 0
  for (let i = 0; i < userId.length; i++) {
    sum += userId.charCodeAt(i)
  }
  const colorIndex = sum % brightColors.length
  return brightColors[colorIndex] ?? "#3371FF"
}
