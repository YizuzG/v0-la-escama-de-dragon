"use client"

import { useMemo } from "react"
import { Sparkles, RotateCcw, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandHeader } from "./brand-header"
import { getTopMatches, tagLabel, type Answers } from "@/lib/scoring"

const RANK_LABELS = ["Tu match perfecto", "2º lugar", "3º lugar", "4º lugar", "5º lugar"]

export function Results({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const results = useMemo(() => getTopMatches(answers, 5), [answers])

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <BrandHeader compact />

      <div className="mt-6 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.35em] text-primary/80">
          El oráculo ha hablado
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Tu Top 5 de fragancias
        </h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Seleccionadas comparando tus elecciones con las notas y el estilo de cada perfume.
        </p>
      </div>

      <ol className="mt-8 flex flex-col gap-4">
        {results.map((r, i) => (
          <li
            key={r.perfume.id}
            className={`relative overflow-hidden rounded-xl border bg-card p-5 ${
              i === 0 ? "border-primary/70 shadow-[0_0_30px_-12px] shadow-primary/40" : "border-border"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {i === 0 ? <Crown className="h-5 w-5" /> : i + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.7rem] font-medium uppercase tracking-wider text-primary/80">
                    {RANK_LABELS[i]}
                  </span>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {r.matchPercent}% afinidad
                  </span>
                </div>

                <h3 className="mt-1 text-balance font-heading text-lg font-bold leading-tight text-foreground">
                  {r.perfume.name}
                </h3>
                <p className="text-sm text-muted-foreground">{r.perfume.brand}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.matchedTags.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-primary"
                    >
                      {tagLabel(t)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onRestart}
          variant="outline"
          className="gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
        >
          <RotateCcw className="h-4 w-4" />
          Volver a empezar
        </Button>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary/70" />
        Consultá disponibilidad en La Escama de Dragón
      </p>
    </div>
  )
}
