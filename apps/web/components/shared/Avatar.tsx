import React from "react";
import Image from "next/image";

interface AvatarProps {
  uuid?: string;
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ uuid, name, size = 32, className = "" }: AvatarProps) {
  if (uuid) {
    return (
      <Image
        src={`https://crafatar.com/avatars/${uuid}?size=${size}&overlay=true`}
        alt={name}
        width={size}
        height={size}
        className={`rounded ${className}`}
        unoptimized
      />
    );
  }

  return (
    <div
      className={`bg-bg-elevated flex items-center justify-center rounded text-text-muted font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
