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
<script>
    (function(){
        YoutubeTracker.track('.track-youtube-embed');
    })();
</script>
</body>
</html>
```

