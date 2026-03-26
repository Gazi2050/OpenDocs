import { cn } from "@/lib/utils";
import type { HeaderProps } from "@/types/opendocs";
import Image from "next/image";
import Link from "next/link";

export default function Header({ children, className }: HeaderProps) {
  return (
    <div className={cn("header", className)}>
      <Link
        href="/"
        className="flex items-center gap-2 md:flex-1 md:gap-3"
      >
        <Image
          src="/assets/images/logo01.png"
          alt=""
          width={160}
          height={48}
          className="hidden h-9 w-auto md:block"
          priority
        />
        <Image
          src="/assets/images/logo01.png"
          alt=""
          width={40}
          height={40}
          className="size-8 object-contain md:hidden"
          priority
        />
        <span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          OpenDocs
        </span>
      </Link>
      {children}
    </div>
  );
}
