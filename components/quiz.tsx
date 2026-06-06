"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandHeader } from "./brand-header"
import { Results } from "./results"
import { questions } from "@/lib/questions"
import type { Answers } from "@/lib/scoring"
import { cn } from "@/lib/utils"

type Stage = "intro" | "quiz" | "results"

export function Quiz() {
  const [stage, setStage] = useState<Stage>("intro")
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const question = questions[step]
  const selected = answers[question?.id] ?? []
  const total = questions.length
  const progress = Math.round(((step + 1) / total) * 100)

  function toggleOption(idx: number) {
    if (!question) return
    const current = answers[question.id] ?? []
    let next: number[]
    if (current.includes(idx)) {
      next = current.filter((i) => i !== idx)
    } else if (question.max === 1) {
      next = [idx]
    } else if (current.length >= question.max) {
      next = [...current.slice(1), idx]
    } else {
      next = [...current, idx]
    }
    setAnswers((a) => ({ ...a, [question.id]: next }))

    // Avanzar automáticamente en preguntas de selección única
    if (question.max === 1) {
      setTimeout(() => goNext(), 220)
    }
  }

  function goNext() {
    if (step < total - 1) {
      setStep((s) => s + 1)
    } else {
      setStage("results")
    }
  }

  function goPrev() {
    if (step > 0) setStep((s) => s - 1)
    else setStage("intro")
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setStage("intro")
  }

  if (stage === "intro") {
    return (
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center gap-8 px-6 py-10 text-center">
        <BrandHeader />
        <div className="space-y-3">
          <h2 className="text-balance font-heading text-xl font-semibold text-foreground">
            Encontrá tu fragancia ideal
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            Respondé {total} preguntas y nuestro oráculo comparará tus gustos con las notas y el
            estilo de cada perfume para revelarte tu Top 5.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => setStage("quiz")}
          className="w-full font-heading text-sm font-semibold uppercase tracking-widest"
        >
          Comenzar el ritual
        </Button>
      </div>
    )
  }

  if (stage === "results") {
    return <Results answers={answers} onRestart={restart} />
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col px-5 py-6">
      {/* Header con progreso */}
      <div className="flex items-center justify-between gap-4">
        <BrandHeader compact />
        <span className="font-heading text-sm font-semibold tabular-nums text-primary">
          {step + 1}
          <span className="text-muted-foreground">/{total}</span>
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Pregunta */}
      <div className="mt-7">
        <h2 className="text-balance font-heading text-xl font-bold leading-snug text-foreground sm:text-2xl">
          {question.text}
        </h2>
        {question.max > 1 && (
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-primary/80">
            Podés elegir hasta {question.max}
          </p>
        )}
      </div>

      {/* Opciones */}
      <div className="mt-5 flex flex-col gap-2.5">
        {question.options.map((opt, idx) => {
          const isSelected = selected.includes(idx)
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleOption(idx)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground/90 hover:border-primary/50 hover:bg-card/80",
              )}
            >
              <span className="text-sm font-medium leading-snug">{opt.label}</span>
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40",
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
            </button>
          )
        })}
      </div>

      {/* Botones de navegación: justo debajo de las opciones, no al fondo */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={goPrev}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          onClick={goNext}
          disabled={selected.length === 0}
          className="gap-1.5 font-semibold"
        >
          {step === total - 1 ? "Ver resultados" : "Siguiente"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
