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
  dao: {id: string; name: string; logo: string}
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

export type TSlide = {
  id: string
  title: string
  subtitle: string
}
