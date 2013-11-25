var bulletid = 0;

var Bullet = function(msg,line,spd,pos,color)
{
	if(!(this.screen = document.getElementById("overlay")))
		alert("Canvas with id='overlay' is not detected!");
	this.id = ++bulletid;
	this.msg = msg || 'Hello World';
	this.line = line || 10; //y coordinate
	this.spd = spd || 1;
	this.pos = pos || 640; //x coordinate
	this.ypos = null;
	this.textlen = null;
	this.color = color || '#FFFFFF';
	this.out = false;
	
	this.objlog = new Array();
	//this.addLog("Bullet created");
}

Bullet.prototype = 
{
	addLog: function(msg)
	{
		var logmsg = new Date().toString() + "\n" + msg;
		console.log(logmsg);
		this.objlog.push(logmsg);
	}
}