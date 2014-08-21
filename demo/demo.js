console.log('demo');
chrome.tabs.onUpdated.addListener(function(tab){
    chrome.tabs.sendMessage(tab.id, {message: 'demo'}, function(){
        console.log(arguments);
    });
});
