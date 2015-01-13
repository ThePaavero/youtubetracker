# youtubetracker

YouTube's JsAPI can be a bitch to set up for simple tracking purposes.
This simple script is supposed to make tracking your embeds as easy as possible.

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
            'unstarted': function () {
                console.log('Status is "unstarted"');
            },
            'ended': function () {
                console.log('Status is "ended"');
            },
            'playing': function () {
                console.log('Status is "playing"');
            },
            'paused': function () {
                console.log('Status is "paused"');
            },
            'buffering': function () {
                console.log('Status is "buffering"');
            },
            'video cued': function () {
                console.log('Status is "video cued"');
            }
        });
    })();
</script>
</body>
</html>
```

