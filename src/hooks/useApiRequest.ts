import axios, { AxiosRequestConfig, Method } from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { PublicConfiguration } from 'swr/dist/types'
import router from 'next/router'
import { store } from '../store/store'
import { closeAll } from '../store/slices/layoutSlice'

axios.defaults.baseURL = axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false

const appAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
})

const cmsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_API_URL,
})

export interface APIRequestOptions {
  method: Method
  url: string
  data?: Object
  accessToken?: string
  configs?: AxiosRequestConfig<Object>
}

export const createAPIRequest = (apiType: string, requestOption: APIRequestOptions) => {
  const { method, url, data, configs, accessToken } = requestOption

  let reqConfigs = configs || {}
  let headers: any = {}
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  reqConfigs = { ...configs, headers: { ...headers, ...(reqConfigs.headers || {}) } }
  const apiInstance = apiType === 'cms' ? cmsAPI : appAPI

  return new Promise((resolve, reject) =>
    apiInstance
      .request({ method, url, data, ...reqConfigs })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error?.response?.status === 500) {
          store.dispatch(closeAll())
          router.push('/500')
        }
        return reject(error.response)
      })
  )
}

export const createAppAPIRequest = (requestOption: APIRequestOptions) => createAPIRequest('app', requestOption)
export const createCmsAPIRequest = (requestOption: APIRequestOptions) => createAPIRequest('cms', requestOption)

const appFetcher = (requestsOptions: APIRequestOptions | Array<APIRequestOptions>) => {
  if (Array.isArray(requestsOptions)) {
    const requestsPromise = requestsOptions.map((requestOpt: APIRequestOptions) => createAppAPIRequest(requestOpt))
    return Promise.all(requestsPromise)
  }

  return createAppAPIRequest(requestsOptions)
}

const cmsFetcher = (requestsOptions: APIRequestOptions | Array<APIRequestOptions>) => {
  if (Array.isArray(requestsOptions)) {
    const requestsPromise = requestsOptions.map((requestOpt: APIRequestOptions) => createCmsAPIRequest(requestOpt))
    return Promise.all(requestsPromise)
  }

  return createCmsAPIRequest(requestsOptions)
}

export interface APIConfigOptions extends Partial<PublicConfiguration> {
  discardCache?: boolean
}

export const useApiRequest = (reqOptions: APIRequestOptions | Array<APIRequestOptions>, config?: APIConfigOptions) => {
  const key = [reqOptions]
  const { cache } = useSWRConfig()
  if (config?.discardCache) {
    cache.delete(key)
  }
  return useSWR(key, appFetcher, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...config,
  })
}

export const useCmsApiRequest = (
  reqOptions: APIRequestOptions | Array<APIRequestOptions>,
  config?: APIConfigOptions
) => {
  const key = [reqOptions]
  const { cache } = useSWRConfig()
  if (config?.discardCache) {
    cache.delete(key)
  }
  return useSWR(key, cmsFetcher, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...config,
  })
}
