import {Alert} from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {ApolloClient, createHttpLink, gql, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import {baseEndpoint} from '../config'

const httpLink = createHttpLink({
  uri: baseEndpoint,
})

const authLink = setContext(async (_, {headers}) => {
  const user: FirebaseAuthTypes.User | null = auth().currentUser

  if (user) {
    const idTokenResult: FirebaseAuthTypes.IdTokenResult =
      await user.getIdTokenResult(true)
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
  link: authLink.concat(httpLink),
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
