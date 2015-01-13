window.YoutubeTracker = function (selector) {

    var iframes;
    var players = [];

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
            iframe.src = iframe.src + (iframe.src.indexOf('?') < 0 ? '?enablejsapi=1' : '&enablejsapi=1');

            var player = new YT.Player(iframe, {
                events: {
                    'onReady': function (e) {
                        console.log('Player ready');
                    },
                    'onStateChange': function (e) {
                        var state = e.data;
                        console.log(state);
                    }
                }
            });

            players.push(player);
        }

        console.log(players);
    };

    init();
};
