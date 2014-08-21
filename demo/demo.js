console.log('demo');
chrome.tabs.onCreated.addListener(function(tab){
    chrome.tabs.sendMessage(tab.id, {message: 'demo'}, function(){
        console.log(arguments);
    });
});
