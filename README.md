# YoutubeTracker

## The problem
You have embedded YouTube videos on your site (normal iframes).

Now you want to track their events (play, pause, complete, etc.).

## The solution
```javascript
YoutubeTracker('.track-youtube-embed', {[Your own event callbacks]});
```

----------

YouTube's JsAPI can be a bitch to set up for basic tracking purposes.
This simple script is supposed to make tracking your embeds as easy as possible.

###It will...
* Import YouTube's API script (async)
* Add "enablejsapi=1" to your iframes' URLs if needed
* Let you use your own code to track the events
* Give you the video's data object as an argument (ID, title, duration, etc.)

## Usage example
```html
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Example</title>
    <script src='YoutubeTracker.js'></script>
</head>
<body>
<iframe class='track-youtube-embed' width="560" height="315" src="//www.youtube.com/embed/tgO4Gd4RhvM" frameborder="0" allowfullscreen></iframe>
<iframe class='track-youtube-embed' width="560" height="315" src="//www.youtube.com/embed/dXqWJtWmceo" frameborder="0" allowfullscreen></iframe>
<script>
    (function () {
        YoutubeTracker('.track-youtube-embed', {
            'unstarted': function (videoData) {
                console.log('Status is "unstarted" for video "' + videoData.title + '"');
                // Ping your tracker
            },
            'ended': function (videoData) {
                console.log('Status is "ended" for video "' + videoData.title + '"');
                // Ping your tracker
            },
            'playing': function (videoData) {
                console.log('Status is "playing" for video "' + videoData.title + '"');
                // Ping your tracker
            },
            'paused': function (videoData) {
                console.log('Status is "paused" for video "' + videoData.title + '"');
                // Ping your tracker
            },
            'buffering': function (videoData) {
                console.log('Status is "buffering" for video "' + videoData.title + '"');
                // Ping your tracker
            },
            'video cued': function (videoData) {
                console.log('Status is "video cued" for video "' + videoData.title + '"');
                // Ping your tracker
            }
        });
    })();
</script>
</body>
</html>
```

##jQuery plugin

There's also a jQuery plugin version. Usage goes like this:
```html
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Example</title>
    <script src='//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>
    <script src='YoutubeTracker.jquery.js'></script>
</head>
<body>
<iframe class='track-youtube-embed' width="560" height="315" src="//www.youtube.com/embed/tgO4Gd4RhvM" frameborder="0" allowfullscreen></iframe>
<iframe class='track-youtube-embed' width="560" height="315" src="//www.youtube.com/embed/dXqWJtWmceo" frameborder="0" allowfullscreen></iframe>
<script>
    $(function () {
        var videos = $('.track-youtube-embed');
        videos.youtubeTracker();
        videos.on('play', function (data) {
            console.log('Video is playing!');
        });
    });
</script>
</body>
</html>
```

Available event names are:

* unstarted
* end
* play
* pause
* buffering
* cue