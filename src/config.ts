import axios from 'axios'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'

export const baseEndpoint: string =
  'https://holdim-api-v3ax6dvhgq-ey.a.run.app/v1'

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
