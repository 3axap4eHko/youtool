(function(){
    var urls = [
            'doubleclick.net/',
            'am15.net/',
            'ad1.ru/',
            'adcdn.tv/',
            'cdn.skycdnhost.com/',
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
            'directadvert.ru/',
            '/advertising/',
            'r.mradx.net/',
            'trafmag.com/',
            'adriver.ru',
            'marketgid.com/',
            'banner-rad.com/',
            '/ads.js',
            '/ads.css'
        ];

    chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
              return {cancel: urls.some(function(expr){ return !!~details.url.indexOf(expr); })};
            },
            {urls: ["<all_urls>"]},
            ["blocking"]);
})();
