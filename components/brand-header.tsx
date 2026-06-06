"use client"

import Image from "next/image"

export function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className={compact ? "relative h-16 w-16" : "relative h-28 w-28"}>
        <Image
          src="/logo-escama-dragon.png"
          alt="Logo de La Escama de Dragón: una escama de dragón granate sobre fondo negro"
          fill
          priority
          className="object-contain"
          sizes="112px"
        />
      </div>
      {!compact && (
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-[0.18em] text-primary sm:text-4xl">
            La Escama
          </h1>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.4em] text-foreground/70">
            de Dragón
          </p>
        </div>
      )}
    </div>
  )
}
