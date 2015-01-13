window.YoutubeTracker = function (selector, eventCallbacks) {

    var iframes;
    var players = [];
    var events = {
        '-1': 'unstarted',
        '0': 'ended',
        '1': 'playing',
        '2': 'paused',
        '3': 'buffering',
        '5': 'video cued'
    };
    var callbacks = {};

    for (var i in events) {

        var name = events[i];

        if (typeof eventCallbacks[name] === 'function') {
            callbacks[name] = eventCallbacks[name];
        } else {
            callbacks[name] = function () {
                // ...
            };
        }
    }

    var init = function () {

        iframes = document.querySelectorAll(selector);

        if (iframes.length < 1) {
            return false;
        }

        addYoutubeJsApi();
        createGlobalHook();
    };

    var createGlobalHook = function () {
        window.onYouTubeIframeAPIReady = processEmbeds;
    };

    var addYoutubeJsApi = function () {

        var tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    var processEmbeds = function () {

        var i;

        for (i = 0; i < iframes.length; i++) {

            var iframe = iframes[i];

            // Add the "" to our src URL
            if (iframe.src.indexOf('enablejsapi') < 0) {
                iframe.src = iframe.src + (iframe.src.indexOf('?') < 0 ? '?enablejsapi=1' : '&enablejsapi=1');
            }

            var player = new YT.Player(iframe, {
                events: {
                    'onReady': function (e) {
                        // ...
                    },
                    'onStateChange': function (e) {
                        var state = e.data;
                        var stateName = getStateName(state);

                        callbacks[stateName](e.target.getVideoData());
                    }
                }
            });

            players.push(player);
        }
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

    var getVideoIdFromUrl = function (url) {

        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'Error parsing video ID from URL';
        }
    };

    init();
};
