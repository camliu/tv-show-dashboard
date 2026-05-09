export interface Show {
  id: number
  name: string
  image: string | undefined
  imageOriginal: string | undefined
  rating: number | null
  genres: string[]
  summary: string | null
  status: string
  premiered: string
  ended: string | null
  network: string | null
  language: string
  runtime: number | null
}
