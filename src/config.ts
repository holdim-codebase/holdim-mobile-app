import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const baseEndpoint = 'https://holdim-api-v3ax6dvhgq-ey.a.run.app/v1'

let headers = {}
export const axiosInstance = axios.create({baseURL: baseEndpoint, headers})
axiosInstance.interceptors.request.use(
  async config => {
    const userId = await AsyncStorage.getItem('User ID')

    if (userId) {
      if (config.headers) config.headers.Authorization = `User id ${userId}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)
