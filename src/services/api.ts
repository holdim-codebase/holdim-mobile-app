import {Alert} from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import {baseEndpoint, snapshotEndpoint} from '../config'

const baseHttpLink = createHttpLink({
  uri: baseEndpoint,
})

const snapshotHttpLink = createHttpLink({
  uri: snapshotEndpoint,
})

const authLink = setContext(async (_, {headers}) => {
  const user: FirebaseAuthTypes.User | null = auth().currentUser

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
      },
    }
  }
})

export const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'splashClient',
    snapshotHttpLink,
    authLink.concat(baseHttpLink),
  ),
  cache: new InMemoryCache(),
})

// TODO add more variants for each type of error
export const handleHTTPError = () => {
  Alert.alert('Something went wrong', `Please try again`, [
    {
      text: 'Ok',
    },
  ])
}

export const REGISTER_USER = gql`
  mutation RegisterUser($walletAddress: ID!) {
    registerUser(walletAddress: $walletAddress) {
      id
      walletAddress
    }
  }
`

export const GET_PROPOSALS = gql`
  query GetProposals($onlyFollowedDaos: Boolean) {
    proposals(onlyFollowedDaos: $onlyFollowedDaos) {
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
  }
`

export const GET_DAO_PROPOSALS = gql`
  query GetDaoProposals($daoIds: [ID!]) {
    proposals(daoIds: $daoIds) {
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
  }
`

export const GET_POOL = gql`
  query GetPool($daoId: String!) {
    proposals(where: {id: $daoId}) {
      id
      scores
      choices
      symbol
      scores_total
      votes
      quorum
    }
  }
`

export const GET_DAO_DETAIL = gql`
  query GetDAOs($ids: [ID!], $onlyMain: Boolean) {
    daos(ids: $ids) {
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
`

export const GET_DAO_LIST = gql`
  query GetDAOs($ids: [ID!], $onlyMain: Boolean) {
    daos(ids: $ids) {
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
