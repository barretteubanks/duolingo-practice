

// Detect change in page navigation
chrome.webNavigation.onHistoryStateUpdated.addListener(tab => {
    chrome.tabs.sendMessage(tab.tabId, { type: 'page-rendered'});

}, { url: [{hostSuffix: 'duolingo.com'}] });