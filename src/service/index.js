import WSRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import localCache from '../utils/cache'

const wsRequest = new WSRequest({
  // baseURL: BASE_URL,
  baseURL: '/api', // 通过/api别名指定后端路由
  timeout: TIME_OUT,
  withCredentials : true,
  // 拦截器  由用户自己传
  // interceptors: {
  //   requestInterceptor: (config) => {
  //     // 添加token
  //     const cookie = localCache.getCache('cookie')
  //     if (cookie) {
  //       if (config.headers) {
  //         console.log("cookie");
  //         config.headers.Authorization = `Bearer ${cookie}`
  //       }
  //     }
  //     return config
  //   },
  //   requestInterceptorCatch: (err) => {
  //     return err
  //   },
  //   responseInterceptor: (res) => {
  //     return res
  //   },
  //   responseInterceptorCatch: (err) => {
  //     return err
  //   }
  // }
})

export default wsRequest
