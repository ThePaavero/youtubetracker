(function ($) {

    $.fn.youtubeTracker = function () {

        var events = {
            '-1': 'unstarted',
            '0': 'end',
            '1': 'play',
            '2': 'pause',
            '3': 'buffering',
            '5': 'cued'
        };

        var iframeCollection = this;

        var init = function () {

            addYoutubeJsApiIfDoesntExist();
            createGlobalHook();

            iframeCollection.each(function () {
                var iframe = $(this);
                addJsParamIfDoesntExist(iframe);
            });
        };

        var addYoutubeJsApiIfDoesntExist = function () {

            if ($('.youtube-api-added-by-youtubetracker').length > 0) {
                return;
            }

            var tag = document.createElement('script');

            tag.className = 'youtube-api-added-by-youtubetracker';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        };

        var addJsParamIfDoesntExist = function (iframe) {
            var src = iframe.attr('src');
            if (src.indexOf('enablejsapi') < 0) {
                iframe.attr('src', src + (src.indexOf('?') < 0 ? '?enablejsapi=1' : '&enablejsapi=1'));
            }
        };

        var createGlobalHook = function () {
            window.onYouTubeIframeAPIReady = function () {
                processIframes();
            };
        };

        var processIframes = function () {
            iframeCollection.each(function () {
                processIframe(this);
            });
        };

        var processIframe = function (iframe) {
            var player = new YT.Player(iframe, {
                events: {
                    'onReady': function (e) {
                        // ...
                    },
                    'onStateChange': function (e) {
                        var state = e.data;
                        var stateName = getStateName(state);
                        $(iframe).trigger(stateName);
                    }
                }
            });
        };

        var getStateName = function (state) {

            state = String(state);

            for (var i in events) {
                var code = i;
                var name = events[i];
                if (code === state) {
                    return name;
                }
            }

            return null;
        };

        init();
    };

})(jQuery);