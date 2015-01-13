window.YoutubeTracker = function (selector) {

    var iframes;
    var players;

    var init = function () {

        iframes = document.querySelectorAll(selector);

        if (iframes.length < 1) {
            return false;
        }

        addYoutubeJsApi();
        createGlobalHook();
    };

    var createGlobalHook = function () {
        window.onYouTubeIframeAPIReady = function () {

            for (var i in iframes) {

                var iframe = iframes[i];

                iframe.tracker = new YT.Player(iframe, {
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
            }
        };
    };

    var addYoutubeJsApi = function () {
        var tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    init();
};