console.log('background')
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  console.log(sender)
  sendResponse('from background')
})
