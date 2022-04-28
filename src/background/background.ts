import { setOpenWeatherTempScale } from '../utils/storage'
chrome.runtime.onInstalled.addListener(() => {
  setOpenWeatherTempScale({
    tempScale: 'metric',
    homeCity: '',
    hasOverlay: false,
  })

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension',
  })
})
