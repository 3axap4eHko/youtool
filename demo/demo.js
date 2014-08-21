console.log('demo');
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    chrome.tabs.sendMessage(tabId, {id: chrome.runtime.id, message: 'demo'}, function(){
        console.log(arguments);
    });
});
