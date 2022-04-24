import { OpenWeatherTempScale } from './app'
export interface LocalStorage {
  cities?: string[]
  options?: WeatherTemplateScale
}

export interface WeatherTemplateScale {
  homeCity: string
  tempScale?: OpenWeatherTempScale
}

export type LocalStorageKey = keyof LocalStorage

export const setStoredCities = (cities: string[]): Promise<string> => {
  const val: LocalStorage = { cities }
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(val, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve('success')
      }
    })
  })
}

export const getStoredCities = (): Promise<string[]> => {
  const keys: LocalStorageKey[] = ['cities']
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(result.cities ?? [])
      }
    })
  })
}

export const setOpenWeatherTempScale = (
  scale: WeatherTemplateScale
): Promise<void> => {
  const scaleVal: LocalStorage = { options: scale }
  return new Promise((resolve) => {
    chrome.storage.local.set(scaleVal, () => {
      resolve()
    })
  })
}
export const getOpenWeatherTempScale = (): Promise<WeatherTemplateScale> => {
  const scaleVal: LocalStorageKey[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(scaleVal, (res) => {
      resolve(res.options)
    })
  })
}
