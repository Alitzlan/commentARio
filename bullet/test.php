<!DOCTYPE HTML>
<html>
<head>
<meta id="Viewport" name="viewport" width="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<script src="http://code.jquery.com/jquery-2.0.0.js"></script>
<script type="text/javascript">
$(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
	  var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width; //get proper width
	  var mw = 480; // min width of site
	  var ratio =  ww / mw; //calculate ratio
	  if( ww < mw){ //smaller than minimum size
	   $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
	  }else{ //regular size
	   $('#Viewport').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
	  }
	}
});
</script>

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
#image
{
	position: absolute;
	top: 0;
	left: 0;
}
#controls
{
	position: absolute;
}
</style>
<script>

$(document).ready(function(){
	canvas = document.getElementById("overlay");
	$("#image").width("100%");
	canvas.width = $("#image").width();
	canvas.height = $("#image").height();
	$("#controls").css({"top":$("#image").height(),"left":"0px","margin-left":"0px"});
	
	c = new Screen(document.getElementById('overlay'));
	textbox = document.getElementById('textbox');
	linebox = document.getElementById('linebox'); linerand = document.getElementById('linerand');linebox.max=canvas.height;
	colorbox = document.getElementById('colorbox'); colorrand = document.getElementById('colorrand');
	
	c.play();
	
	function shoot_comments() {
		$.get(<?php echo '"http://gateway-ymfyp2013.rhcloud.com/comments/' . $_GET['t'] . '"'?>, function(data) {
			comments = data;
			$.each(comments, function(index, value) {
				var delay = Math.floor(Math.random()*3000);
				setTimeout(function(){c.loadBullet(new Bullet(value,Math.random()*canvas.height,value.length/25+2,canvas.width))},delay+index);
			});
		});
	}
	
	shoot_comments();
	
	function shoot()
	{
		var spd = textbox.value.length / 5;
		if (spd>4){spd=4}
		if (spd<1){spd=1}
		var line = linebox.value;
		var color = colorbox.value;
		if (colorrand.checked){colorbox.value=color='#'+parseInt(Math.floor(Math.random()*parseInt('FFFFFF',16)+1)).toString(16)}
		if (linerand.checked){linebox.value=line=Math.floor(Math.random()*330+1);}
		
		var bullet = new Bullet(textbox.value,line,spd,canvas.width,color);
		c.loadBullet(bullet);
	}
	
	$("#shoot").click(shoot);
});
</script>
</head>
<body>
<div id="display">
<img id="image" src="01.jpg"></img>
<canvas id="overlay">
Oops, your browser does not support canvas!
</canvas>
</div>

<fieldset id="controls">
Text:<input id="textbox" type="text" value="input text here" onfocus="this.value=''" onblur="if(!this.value){this.value='input text here'}"></input><br />
Color:<input id="colorbox" type="color" value="#FFFFFF"></input><input id="colorrand" type="checkbox">random</input><br />
Position:<input id="linebox" type="range" min="0" max="330"></input><input id="linerand" type="checkbox">random</input><br />
<button id="shoot">shoot</button>
</fieldset>

<script>
</script>
</body>
</html>