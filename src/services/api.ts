import axios from 'axios'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'

import {baseEndpoint} from '../config'
import {Alert} from 'react-native'

let headers: any = {}

export const axiosInstance = axios.create({baseURL: baseEndpoint, headers})
axiosInstance.interceptors.request.use(
  async config => {
    const user: FirebaseAuthTypes.User | null = auth().currentUser

    if (user) {
      const idTokenResult: FirebaseAuthTypes.IdTokenResult =
        await user.getIdTokenResult()
      if (config.headers) {
        config.headers.Authorization = `User JWT ${idTokenResult.token}`
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// TODO add more variants for each type of error
export const handleHTTPError = () => {
  Alert.alert('Something went wrong', `Please try again`, [
    {
      text: 'Ok',
    },
  ])
}

// TODO change type (any)
export const createUser = (walletAddressInput: string): Promise<any> => {
  return axiosInstance.post('/user/register', walletAddressInput)
}
