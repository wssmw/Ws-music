import axios from 'axios'
import { ElLoading } from 'element-plus'
const isLoading = true

class WSRequest {
  instance
  interceptors
  loading
  // 是否要有loading有用户自己传，默认是true
  showLoading
  constructor(config) {
    // 创建实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? isLoading
    // 局部的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 局部的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 全局的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '努力加载中！',
            target:'body',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)',
            // customClass:'Z-Loading'
          })
          setTimeout(() => {
            this.loading.close()
          }, 2000)
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 全局的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // loading关闭
        this.loading.close()
        const data = res.data
        return data
      },
      // 响应的两种错误
      //    1.直接请求失败，返回错误的状态码，比如404---用下面的拦截
      //    2.请求成功，但是没有数据，在返回的数据中returnCode时候-1001，用上面这种拦截
      (err) => {
        // 关闭 loading
        this.loading.close()
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request(config)
        .then((res) => {
          // 将showloading设置为true
          if (config.interceptors?.responseInterceptor) {
            // 判断是否有单独的响应结果的拦截器，如果有执行
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = isLoading

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = isLoading

          reject(err)
          return err
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default WSRequest
