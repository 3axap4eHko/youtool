(function(){
    function parseUri(str, result){
    	var glue1 = '=';
    	var glue2 = '&';
    	result = result || {};
        str.split(glue2).forEach(function(expr){
    		var tmp = expr.split(glue1);
    		result[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' ');
        });
    
    	return result;
    }


    function toArray(data) {
        return Array.prototype.slice.apply(data);
    }

    function XHR(options)
    {
        var xhr = new XMLHttpRequest();
        xhr.responseType = options.dataType || xhr.responseType;
        xhr.open((options.method || 'get').toUpperCase(), options.url, true);
        xhr.onload = function(){
            options.onload(xhr.response);
        };
        xhr.send(options.data || null);

        return xhr;
    }

    function youtubeDownload(videoId, callback)
    {
        XHR({
            url : 'https://www.youtube.com/get_video_info?video_id='+videoId,
            onload: function(response){
                var info = parseUri(response);
                var streams = info['url_encoded_fmt_stream_map'].split(','); 
                var results = {
                    id: videoId,
                    title: info['title'],
                    thumbnail: info['thumbnail_url'],
                    qualities: []
                };
                for(var i=0; i<streams.length; i++){  
                    var real_stream = parseUri(streams[i]);  
                    real_stream['url'] += '&signature=' + real_stream['sig'];  
                    results.qualities.push(real_stream);  
                }
                callback(results);
            }
        });
    }

    function emptyEvent(event)
    {
        event.stopPropagation();
        return false;
    }
    
    window.addEventListener('load', function(event) {
        var youtube = toArray(document.querySelectorAll('.html5-video-player'));
        youtube.forEach(function(player){
            var controlPanel = player.querySelector('.html5-player-chrome');
            var video = player.querySelector('video').getAttribute('data-youtube-id');
            var btn = document.createElement('div');
            btn.setAttribute('role','button');
            btn.setAttribute('class','ytp-button ytp-button-download');
            btn.setAttribute('title','Download video');
            btn.setAttribute('tabindex','6200');
            controlPanel.appendChild(btn);
            btn.addEventListener('click', function(evt) {
                youtubeDownload(video, function(info){
                    var popup = document.querySelector('[data-youtool-id="'+info.id+'"]');
                    if (popup) {
                        popup.parentNode.removeChild(popup);
                    }
                    popup = document.createElement('div');
                    popup.setAttribute('class','yt-popup');
                    popup.setAttribute('data-youtool-id',info.id);
                    var close = document.createElement('div');
                    close.setAttribute('class','yt-popup-close');
                    close.innerHTML = 'X';
                    close.addEventListener('click', function(closeEvent){
                        popup.parentNode.removeChild(popup);
                        closeEvent.stopPropagation();
                    }, false);
                    popup.appendChild(close);
                    info.qualities.forEach(function(videoInfo){
                        var link = document.createElement('a');
                        link.setAttribute('href', videoInfo.url);
                        link.setAttribute('class', 'yt-link');
                        link.setAttribute('title', videoInfo.type);
                        link.setAttribute('target', 'youtool' + info.id);
                        link.innerHTML = videoInfo.quality + ' (' + videoInfo.type.split(';').shift().split('/').pop() + ')';
                        link.addEventListener('contextmenu', emptyEvent, false);
                        link.addEventListener('click', emptyEvent, false);
                        popup.appendChild(link);
                    });
                    var video = document.querySelector('[data-youtube-id="'+info.id+'"]').parentNode;
                    video.appendChild(popup);
                });
            }, false);

        });
    }, false);
})();