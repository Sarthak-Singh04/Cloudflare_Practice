'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { User } from 'lucide-react';

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  return (
    <div className={cn("aspect-square h-fit flex-none rounded-full bg-secondary", className)} style={{ width: size ?? 48, height: size ?? 48 }}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={size ?? 48}
          height={size ?? 48}
          className="object-cover rounded-full"
        />
      ) : (
        <User className="w-full h-full text-secondary" />
      )}
    </div>
  );
}
