    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg && msg.action=='remove') {
            msg.selector.forEach(function(selector){
                var matches = toArray(document.querySelectorAll(selector));
                matches.forEach(function(element){
                    element.parentNode.removeChild(element);
                });
            });
        }
    });