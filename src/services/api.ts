import {Alert} from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {ApolloClient, createHttpLink, gql, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {relayStylePagination} from '@apollo/client/utilities'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {baseEndpoint} from '../config'

const baseHttpLink = createHttpLink({
  uri: baseEndpoint,
})

// added keyArgs (['daoIds'], ['ids']) to relayStylePagination()
// to save data in diff arrays when doing requests with/without daoIds
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        proposalsV2: relayStylePagination(['daoIds', 'ids']),
        daosV2: relayStylePagination(['ids']),
      },
    },
  },
})

const authLink = setContext(async (_, {headers}) => {
  const user: FirebaseAuthTypes.User | null = auth().currentUser

  const walletId = await AsyncStorage.getItem('wallet-id')

  if (user) {
    const idTokenResult: FirebaseAuthTypes.IdTokenResult =
      await user.getIdTokenResult(true)
    console.log(idTokenResult.token)

    return {
      headers: {
        ...headers,
        Authorization: idTokenResult.token
          ? `Bearer ${idTokenResult.token}`
          : '',
        'wallet-id': walletId || '',
      },
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(baseHttpLink),
  cache,
})

// TODO add more variants for each type of error
export const handleHTTPError = () => {
  Alert.alert('Something went wrong', `Please try again`, [
    {
      text: 'Ok',
    },
  ])
}

// Mutations
export const REGISTER_USER = gql`
  mutation RegisterUser($walletAddress: ID!) {
    registerUser(walletAddress: $walletAddress) {
      id
      wallets {
        id
      }
    }
  }
`

export const FOLLOW_DAO = gql`
  mutation FollowDao($daoId: ID!) {
    followDao(daoId: $daoId) {
      id
      name
      personalizedData {
        followed
      }
    }
  }
`

export const UNFOLLOW_DAO = gql`
  mutation UnfollowDao($unfollowDaoDaoId2: ID!) {
    unfollowDao(daoId: $unfollowDaoDaoId2) {
      id
      name
      personalizedData {
        followed
      }
    }
  }
`

// Queries
export const GET_PROPOSALS = gql`
  query GetProposals(
    $first: Int
    $after: String
    $onlyFollowedDaos: Boolean
    $daoIds: [ID!]
  ) {
    proposalsV2(
      first: $first
      after: $after
      onlyFollowedDaos: $onlyFollowedDaos
      daoIds: $daoIds
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          snapshotId
          title
          dao {
            id
            name
            logo
            personalizedData {
              followed
            }
          }
          juniorDescription
          middleDescription
          seniorDescription
          startAt
          endAt
          author
          snapshotLink
          discussionLink
        }
        cursor
      }
    }
  }
`

export const GET_POLL = gql`
  query GetPoll(
    $first: Int
    $after: String
    $onlyFollowedDaos: Boolean
    $ids: [ID!]
  ) {
    proposalsV2(
      first: $first
      after: $after
      onlyFollowedDaos: $onlyFollowedDaos
      ids: $ids
    ) {
      edges {
        node {
          poll {
            scores
            choices
            symbol
            scores_total
            votes
            quorum
          }
          id
        }
        cursor
      }
    }
  }
`

export const GET_DAO_DETAIL = gql`
  query GetDAOs($onlyMain: Boolean, $ids: [ID!]) {
    daosV2(ids: $ids) {
      edges {
        node {
          id
          snapshotId
          name
          logo
          overview
          tokenOverview
          tokens(onlyMain: $onlyMain) {
            id
            name
            marketCap
            totalSupply
            price
            personalizedData {
              quantity
            }
            symbol
          }
          personalizedData {
            followed
          }
        }
      }
    }
  }
`

export const GET_DAO_LIST = gql`
  query GetDAOs($first: Int, $after: String, $onlyMain: Boolean) {
    daosV2(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          snapshotId
          name
          logo
          personalizedData {
            followed
          }
          tokens(onlyMain: $onlyMain) {
            id
            name
            price
            symbol
            totalSupply
            personalizedData {
              quantity
            }
          }
        }
        cursor
      }
    }
  }
`

export const GET_USER_INFO = gql`
  query GET_USER_INFO($tokensOnlyMain2: Boolean) {
    me {
      id
      avatarUrl
      wallet {
        address
        ens
        tokens {
          personalizedData {
            quantity
          }
        }
      }
      followedDaos {
        id
        name
        logo
        tokens(onlyMain: $tokensOnlyMain2) {
          personalizedData {
            quantity
          }
          totalSupply
          price
          symbol
        }
      }
    }
  }
`
