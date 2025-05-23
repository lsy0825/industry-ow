import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'
import { queryToString, tansParams } from './index'
import _ from 'lodash'
// console.log('config', env)
// 创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token?.accessToken
    }
    config.headers['tenant-id'] = '1'

    if (config?.data) {
      let url = config.url + '?' + tansParams(config.data)
      url = url.slice(0, -1)
      config.url = url
    }
    if (env.mock) {
      config.baseURL = env.baseApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config,
      dataType: 'json'
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response
    if (data.code === 401) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}
export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    let finalUrl: any
    const queryString = _.isEmpty(params) ? '' : queryToString(params)
    if (queryString) {
      finalUrl = url + '?' + queryString
    } else {
      finalUrl = url
    }
    return instance.get(finalUrl)
  },
  post<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  },
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  },
  getDownloadFile(url: string, fileName = 'fileName.docx') {
    instance({
      url,
      method: 'get',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  }
}
