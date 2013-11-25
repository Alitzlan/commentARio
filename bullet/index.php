<!DOCTYPE HTML>
<html>
<head>
<!-- Ensure Display on Mobile Device -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
<script src="http://code.jquery.com/jquery-2.0.0.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	//fullscreen overlay
	canvas = document.getElementById("overlay");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//console.log("overlay width:" + canvas.width + ", height:" + canvas.height);
	
	//initiate Screen object
	scr = new Screen(canvas);
	scr.play();
	
	//get comments from forum
	$.get(<?php echo '"http://gateway-ymfyp2013.rhcloud.com/comments/' . $_GET['t'] . '"'?>, function(comments) {
		$.each(comments, function(index, value) {
			//random delay
			var delay = index + 2 * Math.random(); //range (index+1) +- 1
			var span = 1000;
			delay = Math.floor(delay*span);
			
			//construct bullet
			//Bullet(msg,line,spd,pos,color)
			var msg = value;
			var line = Math.random()*scr.numOfLine;
			var spd = 1 + msg.length/6;
			var bullet = new Bullet(msg,line,spd,canvas.width);
			setTimeout(function(){scr.loadBullet(bullet)},delay);
		});
	});
	
	//fix orientation
	var origin_orient = window.orientation;
	$(window).bind("orientationchange", function(){
		var orientation = window.orientation - origin_orient;
		//scr.loadBullet(new Bullet(orientation.toString()));
		var new_orientation = orientation ? -orientation : 0;//0 : 180 + orientation;
		$('html body').css({
			"-webkit-transform": "rotate(" + new_orientation + "deg)"
		});
		if(orientation == 90)
			$('html body').scrollTop($(document).height());
		else if(orientation == 0)
			$('html body').scrollLeft(0);
	});
});
</script>

<script src="bullet.js"></script>
<script src="screen.js"></script>
<script src="loadingbar.js"></script>
<style>
*
{
	padding: 0;
	margin: 0;
}
</style>
</head>
<body>
<canvas id="overlay">
Oops, your browser does not support canvas!
</canvas>
</body>
</html>