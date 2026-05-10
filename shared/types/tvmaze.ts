export interface TvmazeSearchResult {
  score: number
  show: TvmazeShow
}

export interface TvmazeShow {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number
  premiered: string
  ended: string | null
  officialSite: string | null
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: Network | null
  dvdCountry: Country | null
  externals: Externals
  image: ShowImage
  summary: string
  updated: number
  _links: Links
}

interface Schedule {
  time: string
  days: string[]
}

interface Rating {
  average: number | null
}

interface Network {
  id: number
  name: string
  country: Country | null
  officialSite: string | null
}

interface Country {
  name: string
  code: string
  timezone: string
}

interface Externals {
  tvrage: number | null
  thetvdb: number | null
  imdb: string | null
}

interface ShowImage {
  medium: string | null
  original: string | null
}

interface Links {
  self: {
    href: string
  }
  previousepisode?: {
    href: string
    name?: string
  }
  nextepisode?: {
    href: string
    name?: string
  }
}
