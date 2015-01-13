(function ($) {

    $.fn.youtubeTracker = function () {

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

        var startEmittingCustomEvents = function (iframe) {
            //var events = {
            //    '-1': 'unstarted',
            //    '0': 'ended',
            //    '1': 'playing',
            //    '2': 'paused',
            //    '3': 'buffering',
            //    '5': 'video cued'
            //};
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
            console.log(iframe);
        };

        init();
    };

})(jQuery);