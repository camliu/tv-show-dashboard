export interface Country {
  name: string
  code: string
  timezone: string
}

export interface Network {
  id: number
  name: string
  country: Country
  officialSite: string | null
}

export interface WebChannel {
  id: number
  name: string
  country: Country | null
  officialSite: string | null
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
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: {
    time: string
    days: string[]
  }
  rating: {
    average: number | null
  }
  weight: number
  network: Network | null
  webChannel: WebChannel | null
  dvdCountry: Country | null
  externals: {
    tvrage: number | null
    thetvdb: number | null
    imdb: string | null
  }
  image: {
    medium: string
    original: string
  } | null
  summary: string | null
  updated: number
  _links: {
    self: { href: string }
    previousepisode?: {
      href: string
      name?: string
    }
    nextepisode?: {
      href: string
      name?: string
    }
  }
}
