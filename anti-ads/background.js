(function(){
    var base = {
        urls: [
            'doubleclick.net/',
            'am15.net/',
            'ad1.ru/',
            'adcdn.tv/',
            'http://www.google-analytics.com/ga.js',
            'mc.yandex.ru/',
            'an.yandex.ru/',
            'awaps.yandex.ru/',
            'alferac.ru/',
            'algenib.ru/',
            'markhab.ru/',
            'aneef.ru/',
            'googlesyndication.com/pagead/js/adsbygoogle.js',
            'sheat.ru/',
            'dt00.net/',
            '/ads/',
            '://ads.',
            '://advertising.',
            '/advertising/',
            'r.mradx.net/',
            'adriver.ru'
        ],
        selectors: [
            '#osd-id'
        ]
    };

    chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
              return {cancel: base.urls.some(function(expr){ return !!~details.url.indexOf(expr); })};
            },
            {urls: ["<all_urls>"]},
            ["blocking"]);

    chrome.tabs.onUpdated.addListener(function(tabId, info) {
        if (info.status == "complete") {
            chrome.tabs.get(tabId, function(tab) {
                chrome.tabs.sendMessage(tab.id, { action: 'remove', selector: base.selectors });
            });
        }
    });
})();