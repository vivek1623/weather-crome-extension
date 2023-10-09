import { OpenWeatherTempScale } from "./api"

export interface LocalStorage {
  cities?: string[]
  tempScale?: OpenWeatherTempScale
}

export type LocalStorageKeys = keyof LocalStorage

export const getDataFromLocalStorage = (
  keys: LocalStorageKeys[]
): Promise<LocalStorage> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res)
    })
  })
}

export const setDataInLocalStorage = (
  key: keyof LocalStorage,
  value: any
): Promise<void> => {
  const vals: LocalStorage = {
    [key]: value,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}
