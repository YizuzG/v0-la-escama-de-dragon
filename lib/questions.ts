export type Option = {
  label: string
  tags: string[]
  /** Para filtros especiales: género o tipo de marca */
  gender?: "masc" | "fem" | "unisex"
  brandType?: "clasica" | "arabe"
}

export type Question = {
  id: number
  text: string
  /** cuántas opciones se pueden elegir como máximo */
  max: number
  options: Option[]
}

export const questions: Question[] = [
  {
    id: 0,
    text: "¿Qué tipo de marcas buscás?",
    max: 1,
    options: [
      { label: "Marcas clásicas / diseñador", tags: ["pref-clasica"], brandType: "clasica" },
      { label: "Marcas árabes", tags: ["pref-arabe"], brandType: "arabe" },
      { label: "Ambas por igual", tags: [] },
      { label: "No me importa la marca, solo el aroma", tags: [] },
    ],
  },
  {
    id: 1,
    text: "¿Qué tipo de fragancia buscás?",
    max: 1,
    options: [
      { label: "Masculina", tags: [], gender: "masc" },
      { label: "Femenina", tags: [], gender: "fem" },
      { label: "Unisex", tags: [], gender: "unisex" },
      { label: "No me importa mientras me guste", tags: [] },
    ],
  },
  {
    id: 2,
    text: "¿Para qué situación la usarías principalmente?",
    max: 2,
    options: [
      { label: "Trabajo / Estudio", tags: ["trabajo"] },
      { label: "Casual / Versátil", tags: ["casual", "versatil"] },
      { label: "Citas románticas", tags: ["cita", "seductor"] },
      { label: "Eventos nocturnos / Fiesta", tags: ["noche", "fiesta"] },
    ],
  },
  {
    id: 3,
    text: "¿Qué impresión te gustaría causar?",
    max: 2,
    options: [
      { label: "Elegancia y seguridad", tags: ["elegante", "lujo"] },
      { label: "Cercanía y simpatía", tags: ["cercano", "fresco"] },
      { label: "Misterio y sensualidad", tags: ["misterio", "seductor"] },
      { label: "Ninguna en especial, una que solo me guste a mí", tags: [] },
    ],
  },
  {
    id: 4,
    text: "¿Qué estación representa mejor tu estilo?",
    max: 2,
    options: [
      { label: "Primavera", tags: ["primavera"] },
      { label: "Verano", tags: ["verano"] },
      { label: "Otoño", tags: ["otono"] },
      { label: "Invierno", tags: ["invierno"] },
    ],
  },
  {
    id: 5,
    text: "Si fueras a elegir una bebida, ¿cuál te representa más?",
    max: 2,
    options: [
      { label: "Café", tags: ["cafe", "gourmand"] },
      { label: "Whisky / Ron / Coñac / Bebidas fuertes", tags: ["especiada", "amaderada", "calido"] },
      { label: "Tragos / Cócteles dulces", tags: ["dulce", "frutal", "fiesta"] },
      { label: "Jugos de frutas", tags: ["frutal", "fresca"] },
      { label: "Agua", tags: ["acuatica", "fresca", "nada-dulce"] },
    ],
  },
  {
    id: 6,
    text: "¿Qué nivel de proyección preferís?",
    max: 1,
    options: [
      { label: "Discreta, que se note solo de cerca", tags: ["discreta"] },
      { label: "Moderada para el día a día", tags: ["moderada"] },
      { label: "Alta, que deje estela", tags: ["alta"] },
      { label: "Muy potente, que llene una habitación", tags: ["bestia"] },
    ],
  },
  {
    id: 7,
    text: "¿Qué duración esperás?",
    max: 1,
    options: [
      { label: "4 a 6 horas", tags: ["moderada"] },
      { label: "6 a 8 horas", tags: ["moderada", "alta"] },
      { label: "8 a 12 horas", tags: ["alta"] },
      { label: "Más de 12 horas", tags: ["bestia"] },
    ],
  },
  {
    id: 8,
    text: "¿Cuál de estos ambientes te atrae más?",
    max: 2,
    options: [
      { label: "Un lugar de merienda elegante", tags: ["gourmand", "dulce", "elegante"] },
      { label: "Un bosque después de la lluvia", tags: ["amaderada", "aromatica", "fresca"] },
      { label: "Una playa tropical", tags: ["acuatica", "tropical", "citrica", "fresca"] },
      { label: "Un hotel de lujo", tags: ["lujo", "oud", "amaderada"] },
    ],
  },
  {
    id: 9,
    text: "¿Qué tipo de personalidad te describe mejor?",
    max: 2,
    options: [
      { label: "Clásica y refinada", tags: ["elegante", "lujo"] },
      { label: "Aventurera y extrovertida", tags: ["aventurero", "fresco"] },
      { label: "Creativa y original", tags: ["original", "diferente"] },
      { label: "Ambiciosa y dominante", tags: ["dominante", "misterio"] },
      { label: "Ninguna en especial", tags: [] },
    ],
  },
  {
    id: 10,
    text: "¿Qué tan dulce te gusta una fragancia?",
    max: 1,
    options: [
      { label: "Nada dulce", tags: ["nada-dulce"] },
      { label: "Ligeramente dulce", tags: ["ligero-dulce"] },
      { label: "Bastante dulce", tags: ["dulce"] },
      { label: "Muy dulce / gourmand", tags: ["muy-dulce", "gourmand"] },
    ],
  },
  {
    id: 11,
    text: "¿Qué sensación buscás al usar perfume?",
    max: 2,
    options: [
      { label: "Frescura y limpieza", tags: ["fresca", "fresco"] },
      { label: "Confort y calidez", tags: ["calido", "vainilla"] },
      { label: "Seducción y atractivo", tags: ["seductor", "misterio"] },
      { label: "Exclusividad y lujo", tags: ["lujo", "oud"] },
      { label: "Versatilidad", tags: ["versatil"] },
    ],
  },
  {
    id: 12,
    text: "¿Cuál de estos planes elegirías?",
    max: 2,
    options: [
      { label: "Cena en un lugar lindo", tags: ["cita", "elegante"] },
      { label: "Viaje a la montaña", tags: ["amaderada", "aromatica", "aventurero"] },
      { label: "Día de playa", tags: ["acuatica", "tropical", "fresca"] },
      { label: "Fiesta VIP", tags: ["fiesta", "lujo", "noche"] },
    ],
  },
  {
    id: 13,
    text: "¿Qué tipo de ropa usás más frecuentemente?",
    max: 2,
    options: [
      { label: "Traje / Elegante", tags: ["elegante", "lujo"] },
      { label: "Casual urbana", tags: ["casual", "versatil"] },
      { label: "Deportiva", tags: ["fresca", "fresco", "aventurero"] },
      { label: "Moda moderna o llamativa", tags: ["original", "diferente", "fiesta"] },
    ],
  },
  {
    id: 14,
    text: "¿Cuál de estos materiales te atrae más?",
    max: 3,
    options: [
      { label: "Cuero", tags: ["cuero", "amaderada"] },
      { label: "Madera", tags: ["amaderada"] },
      { label: "Seda", tags: ["floral", "elegante"] },
      { label: "Oro y joyería", tags: ["lujo", "oud"] },
      { label: "Caña de azúcar", tags: ["dulce", "azucar", "gourmand"] },
      { label: "Hojas frescas", tags: ["fresca", "aromatica"] },
    ],
  },
  {
    id: 15,
    text: "¿Qué familia olfativa te genera más curiosidad?",
    max: 2,
    options: [
      { label: "Dulce / Vainilla / Gourmand", tags: ["gourmand", "vainilla", "dulce"] },
      { label: "Amaderada / Especiada", tags: ["amaderada", "especiada"] },
      { label: "Frutal / Tropical", tags: ["frutal", "tropical"] },
      { label: "Fresca / Aromática", tags: ["fresca", "aromatica"] },
    ],
  },
  {
    id: 16,
    text: "¿Cuál de estos postres elegirías?",
    max: 2,
    options: [
      { label: "Tiramisú", tags: ["cafe", "gourmand", "dulce"] },
      { label: "Cheesecake de frutos rojos", tags: ["frutal", "dulce", "gourmand"] },
      { label: "Helado de fruta", tags: ["frutal", "fresca"] },
      { label: "Ninguno de estos", tags: ["nada-dulce"] },
    ],
  },
  {
    id: 17,
    text: "¿Cuál de estos platos elegirías?",
    max: 2,
    options: [
      { label: "Milanesa con papas fritas", tags: ["cercano", "casual"] },
      { label: "Una buena carne", tags: ["amaderada", "especiada", "calido"] },
      { label: "Sushi", tags: ["fresca", "elegante", "acuatica"] },
      { label: "Panchos", tags: ["casual", "cercano"] },
      { label: "Sándwich de jamón, queso y salame", tags: ["casual", "cercano"] },
      { label: "Ninguna de estas", tags: [] },
    ],
  },
  {
    id: 18,
    text: "¿Qué tan único querés oler?",
    max: 1,
    options: [
      { label: "Algo popular y seguro", tags: ["popular"] },
      { label: "Algo conocido pero elegante", tags: ["conocido", "elegante"] },
      { label: "Algo diferente", tags: ["diferente"] },
      { label: "Algo que casi nadie use", tags: ["raro"] },
    ],
  },
]
