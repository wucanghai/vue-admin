import request from '@/utils/request'

export interface LoginResponseData {
  username: string
  user_token: string
  time: number
}
export interface LoginResponse {
  code: boolean
  data: LoginResponseData
  msg: string
}

export const login = (data: {}) => {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}
