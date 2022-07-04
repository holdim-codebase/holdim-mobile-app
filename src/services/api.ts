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
  query GetProposals {
    proposals {
      id
      snapshotId
      title
      dao {
        id
        name
        logo
      }
      juniorDescription
      middleDescription
      seniorDescription
      startAt
      endAt
      author
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
