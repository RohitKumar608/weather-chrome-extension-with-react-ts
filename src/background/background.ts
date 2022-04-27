import { setOpenWeatherTempScale } from '../utils/storage'
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  setOpenWeatherTempScale({ tempScale: 'metric', homeCity: '' })

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension',
  })

  console.log(request)
  console.log(sender)
  sendResponse('from background')
})
