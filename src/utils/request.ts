import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const servertype = import.meta.env.VITE_BASE_API

const service = axios.create({
  baseURL: servertype,
  timeout: 6000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    console.log(error)

    return Promise.reject(error)
  }
)

export default service
