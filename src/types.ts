export type TPortfolioResponse = {
  title: string
  symbol: string
  icon: string
  amount: number
  share: number
}[]

export type TFeedResponse = {
  daoTitle: string
  title: string
  icon: string
  description: {
    short: string
    long: string
  }
  start: number
  end: number
  author: string
  votes: number
  scores: {
    title: string
    votingPower: number
    share: number
  }[]
}[]