<!DOCTYPE HTML>
<html>
<head>
<script src="http://code.jquery.com/jquery-2.0.0.js"></script>
<script src="bullet.js"></script>
<script src="screen.js"></script>
<script src="loadingbar.js"></script>
<style>
#overlay
{
	/*border: 1px solid black;*/
	position: absolute;
	top: 0;
	left: 0;
}
#video
{
	position: absolute;
	top: 0;
	left: 0;
}
#controls
{
	position: absolute;
	top: 380px;
	left: 0;
}
</style>
<script>
</script>
</head>
<body>
<div>
<div id="video"></div>
<canvas id="overlay" width="640" height="360">
Oops, your browser does not support canvas!
</canvas>
</div>
<script>
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('video', {
        height: '360',
        width: '640',
        videoId: '1u7_0dMbZdM',
    });
}
</script>
<script>
function shoot_comments() {
	$.get('http://gateway-ymfyp2013.rhcloud.com/comments/' + window.location.hash.replace(/^#/, ''), function(data) {
		comments = data;
		$.each(comments, function(index, value) {
			setTimeout(c.loadBullet(new Bullet(value,Math.random()*330)),Math.random()*5000)
		});
	});
}

$(document).ready(function(){
	shoot_comments();
});

$(window).bind('hashchange', function(){
		shoot_comments();
});

</script>
<div id="controls">
<button onclick="(function(c){c.play();player.playVideo()})(c)">play</button>
<button onclick="(function(c){c.pause();player.pauseVideo()})(c)">pause</button>
<br />
<fieldset>
Text:<input id="textbox" type="text" value="input text here" onfocus="this.value=''" onblur="if(!this.value){this.value='input text here'}"></input><br />
Color:<input id="colorbox" type="color" value="#FFFFFF"></input><input id="colorrand" type="checkbox">random</input><br />
Position:<input id="linebox" type="range" min="0" max="330"></input><input id="linerand" type="checkbox">random</input><br />
<button onclick="shoot()">shoot</button>
</fieldset>
</div>
<script>
c = new Screen(document.getElementById('overlay'));
textbox = document.getElementById('textbox');
linebox = document.getElementById('linebox'); linerand = document.getElementById('linerand');
colorbox = document.getElementById('colorbox'); colorrand = document.getElementById('colorrand');

function shoot()
{
	var spd = textbox.value.length / 5;
	if (spd>4){spd=4}
	if (spd<1){spd=1}
	var line = linebox.value;
	var color = colorbox.value;
	if (colorrand.checked){colorbox.value=color='#'+parseInt(Math.floor(Math.random()*parseInt('FFFFFF',16)+1)).toString(16)}
	if (linerand.checked){linebox.value=line=Math.floor(Math.random()*330+1);}
	
	var bullet = new Bullet(textbox.value,line,spd,null,color);
	c.loadBullet(bullet);
}
</script>
</body>
</html>