import { setOpenWeatherTempScale } from '../utils/storage'
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  setOpenWeatherTempScale({ tempScale: 'metric', homeCity: '' })
  console.log(request)
  console.log(sender)
  sendResponse('from background')
})
