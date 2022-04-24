export interface LocalStorage {
  cities: string[]
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
