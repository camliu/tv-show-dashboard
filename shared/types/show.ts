export interface Show {
  id: number
  name: string
  image: string | undefined
  imageOriginal: string | undefined
  rating: number | null
  genres: string[]
  summary: string
  status: string
  premiered: string | null
  ended: string | null
  network: string | null
  language: string
  runtime: number | null
}

export interface Actor {
  id: number
  name: string
  character: string
  image: string | undefined
}

export interface Season {
  id: number
  name: string
  number: number
  image: string | undefined
}
