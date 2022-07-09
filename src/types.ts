export type TPortfolioResponse = {
  title: string
  symbol: string
  icon: string
  amount: number
  share: number
}[]

export type TProposal = {
  id: string
  snapshotId: string
  title: string
  dao: {
    id: string
    name: string
    logo: string
    personalizedData: {followed: boolean}
  }
  juniorDescription: string
  middleDescription: string
  seniorDescription: string
  startAt: number
  endAt: number
  author: string
  snapshotLink: string
  discussionLink: string
}

export type TPool = {
  id: string
  scores: number[]
  choices: string[]
  symbol: string
  scores_total: number
  votes: number
  quorum: number
}

export type TDAO = {
  id: string
  snapshotId: string
  name: string
  logo: string
  overview: string
  tokenOverview: string
  tokens: [
    {
      id: string
      name: string
      marketCap: number
      totalSupply: number
      price: number
      personalizedData: {
        quantity: number
      }
    },
  ]
  personalizedData: {followed: boolean}
}

export type TSlide = {
  id: string
  title: string
  subtitle: string
}
