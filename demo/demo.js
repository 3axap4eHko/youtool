console.log('demo');
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    chrome.tabs.sendMessage(tabId, {message: 'demo'}, function(){
        console.log(arguments);
    });
});
