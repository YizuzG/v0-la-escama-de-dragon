import { perfumes, type Perfume } from "./perfumes"
import { questions, type Option } from "./questions"

export type Answers = Record<number, number[]> // questionId -> selected option indices

export type ScoredPerfume = {
  perfume: Perfume
  score: number
  matchPercent: number
  matchedTags: string[]
}

/**
 * Calcula el top 5 de perfumes comparando los tags elegidos por el usuario
 * con los tags (notas, estilo, ocasión, etc.) de cada perfume.
 */
export function getTopMatches(answers: Answers, limit = 5): ScoredPerfume[] {
  // Reunir todos los tags elegidos y los filtros especiales
  const chosenTags: string[] = []
  let genderFilter: Perfume["gender"] | null = null
  let brandPref: Perfume["brandType"] | null = null

  for (const q of questions) {
    const selected = answers[q.id] ?? []
    for (const idx of selected) {
      const opt: Option | undefined = q.options[idx]
      if (!opt) continue
      chosenTags.push(...opt.tags)
      if (opt.gender) genderFilter = opt.gender
      if (opt.brandType && (opt.tags.includes("pref-clasica") || opt.tags.includes("pref-arabe"))) {
        brandPref = opt.brandType
      }
    }
  }

  // Contar frecuencia de cada tag (un tag elegido varias veces pesa más)
  const tagWeight = new Map<string, number>()
  for (const t of chosenTags) {
    if (t.startsWith("pref-")) continue
    tagWeight.set(t, (tagWeight.get(t) ?? 0) + 1)
  }

  const totalWeight = Array.from(tagWeight.values()).reduce((a, b) => a + b, 0) || 1

  const scored: ScoredPerfume[] = perfumes.map((perfume) => {
    let score = 0
    const matchedTags: string[] = []

    for (const [tag, weight] of tagWeight) {
      if (perfume.tags.includes(tag)) {
        score += weight
        matchedTags.push(tag)
      }
    }

    // Bonus si coincide la preferencia de marca
    if (brandPref && perfume.brandType === brandPref) {
      score += totalWeight * 0.15
    }

    // Penalización suave por género no coincidente (los unisex nunca se penalizan)
    if (genderFilter && perfume.gender !== "unisex") {
      if (perfume.gender !== genderFilter) {
        score *= 0.25
      } else {
        score += totalWeight * 0.1
      }
    }

    const matchPercent = Math.round((score / (totalWeight * 1.25)) * 100)

    return {
      perfume,
      score,
      matchPercent: Math.min(99, Math.max(35, matchPercent)),
      matchedTags,
    }
  })

  return scored.sort((a, b) => b.score - a.score).slice(0, limit)
}

const TAG_LABELS: Record<string, string> = {
  dulce: "Dulce",
  "muy-dulce": "Muy dulce",
  "ligero-dulce": "Sutilmente dulce",
  "nada-dulce": "Seco",
  gourmand: "Gourmand",
  vainilla: "Vainilla",
  amaderada: "Amaderada",
  especiada: "Especiada",
  frutal: "Frutal",
  tropical: "Tropical",
  fresca: "Fresca",
  aromatica: "Aromática",
  cuero: "Cuero",
  oud: "Oud",
  floral: "Floral",
  citrica: "Cítrica",
  acuatica: "Acuática",
  cafe: "Café",
  elegante: "Elegante",
  calido: "Cálido",
  seductor: "Seductor",
  lujo: "Lujo",
  versatil: "Versátil",
  misterio: "Misterio",
  cercano: "Cercano",
  fresco: "Fresco",
  aventurero: "Aventurero",
  original: "Original",
  dominante: "Dominante",
  discreta: "Discreto",
  moderada: "Proyección media",
  alta: "Alta proyección",
  bestia: "Modo bestia",
  popular: "Popular",
  conocido: "Conocido",
  diferente: "Diferente",
  raro: "Exclusivo",
  trabajo: "Para trabajo",
  casual: "Casual",
  cita: "Para citas",
  noche: "Nocturno",
  fiesta: "Para fiesta",
  primavera: "Primavera",
  verano: "Verano",
  otono: "Otoño",
  invierno: "Invierno",
  tropical: "Tropical",
  azucar: "Caña de azúcar",
}

export function tagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag
}
