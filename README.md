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

#####Available event names are:

* unstarted
* ended
* playing
* paused
* buffering
* video cued
* tick (this one's a bit different, see the example below)

## Usage example <small>([see jQuery version](#jquery-plugin))</small>
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
            'unstarted': function (event, videoData) {
                console.log('Status is "unstarted" for video "' + videoData.title + '"');
                // Ping your tracker or do whatever with event and videoData
            },
            'ended': function (event, videoData) {
                console.log('Status is "ended" for video "' + videoData.title + '"');
                // Ping your tracker or do whatever with event and videoData
            },
            'playing': function (event, videoData) {
                console.log('Status is "playing" for video "' + videoData.title + '"');
                // Ping your tracker or do whatever with event and videoData
            },
            'paused': function (event, videoData) {
                console.log('Status is "paused" for video "' + videoData.title + '"');
                // Ping your tracker or do whatever with event and videoData
            },
            'buffering': function (event, videoData) {
                console.log('Status is "buffering" for video "' + videoData.title + '"');
                // Ping your tracker or do whatever with event and videoData
            },
            'video cued': function (event, videoData) {
                console.log('Status is "video cued" for video "' + videoData.title + '"');
                // Ping your tracker or do whatever with event and videoData
            },
            'tick': function (data) {
                // This ticks once every second. Utilize stuff in "data", e.g. var currentTime = data.getCurrentTime()
            }
        });
    })();
</script>
</body>
</html>
```

##<a name="jquery-plugin"></a>jQuery plugin

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