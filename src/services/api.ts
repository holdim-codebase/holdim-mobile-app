import axios from 'axios'
import { baseEndpoint } from '../config'
import { TPortfolioResponse, TFeedResponse } from '../types'

export const getPortfolio = (): Promise<TPortfolioResponse>  => {
  return axios.get(`${baseEndpoint}/users/me`)
    .then(res => res.data)
}

export const getFeed = (): Promise<TFeedResponse>  => {
  return axios.get(`${baseEndpoint}/feed`)
    .then(res => res.data)
}