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
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: Network | null
  dvdCountry: Country | null
  externals: Externals
  image: ShowImage | null
  summary: string | null
  updated: number
  _links: Links
}

export interface TvmazeSeason {
  id: number
  url: string
  number: number
  name: string
  episodeOrder: number
  premiereDate: string | null
  endDate: string | null
  network: Network | null
  webChannel: Network | null
  image: ShowImage | null
  summary: string | null
  _links: {
    self: { href: string }
  }
}

export interface TvmazeEpisode {
  id: number
  url: string
  name: string
  season: number
  number: number
  type: string
  airdate: string
  airtime: string
  airstamp: string
  runtime: number | null
  rating: Rating
  image: ShowImage | null
  summary: string | null
  _links: {
    self: { href: string }
    show: {
      href: string
      name: string
    }
  }
}

export interface TvmazeCastMember {
  person: TvmazePerson
  character: TvmazeCharacter
  self: boolean
  voice: boolean
}

export interface TvmazePerson {
  id: number
  url: string
  name: string
  country: Country | null
  birthday: string | null
  deathday: string | null
  gender: string
  image: ShowImage | null
  updated: number
  _links: {
    self: { href: string }
  }
}

export interface TvmazeCharacter {
  id: number
  url: string
  name: string
  image: ShowImage | null
  _links: {
    self: { href: string }
  }
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
