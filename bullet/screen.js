var numOfLine = 6;
var Screen = function(canvas)
{
	//Get a canvas to paint on
	this.c = canvas || document.getElementById('overlay') || (function(){
		canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 480;
		canvas.id = "overlay";
		return canvas;
	})();
	
	this.ctx = this.c.getContext('2d');
	this.playFPS = 120; //default 120fps to guerantee performance
	this.fontsize = canvas.height / numOfLine / 2;
	//console.log(canvas.height + " " + this.fontsize);
	this.lineOccupied = Array();
	for(var i = 0; i < numOfLine; i++)
		this.lineOccupied.push(0);
	
	//Loading bar
	var loadingBar = new LoadingBar(this.c,this.ctx);
	loadingBar.play();
	
	this.screenInterval = null;
	this.bulletPod = new Array();
	
	this.objlog = new Array();
	this.addLog("Screen created");
	
	loadingBar.stop();
}

Screen.prototype = 
{
	addLog: function(msg)
	{
		var logmsg = new Date().toString() + "\n" + msg;
		console.log(logmsg);
		this.objlog.push(logmsg);
	},
	
	loadBullet: function(bullet)
	{
			this.bulletPod.push(bullet);
	},
	
	play: function()
	{
		if(this.screenInterval)
			return;
		this.ctx.textAlign = 'left';
		this.ctx.textBaseline="top"; 
		this.ctx.font = this.fontsize + 'px Calibri';
		this.ctx.lineWidth=1;
		this.screenInterval = (function(screen){
			return setInterval(function(){
				screen.ctx.clearRect(0,0,screen.c.width,screen.c.height);
				for(var i=0;curBullet=screen.bulletPod[i];i++)
				{
					if(screen.lineOccupied[Math.floor(curBullet.line / numOfLine)] && screen.lineOccupied[Math.floor(curBullet.line/numOfLine)] != curBullet.id)
					{
						curBullet.line = (curBullet.line + screen.c.height / numOfLine) % (screen.c.height - screen.fontsize);
						continue;
					}
					
					screen.lineOccupied[Math.floor(curBullet.line/numOfLine)] = curBullet.id;
					screen.ctx.fillStyle = curBullet.color;
					screen.ctx.strokeStyle = '#'+(parseInt('FFFFFF',16)-parseInt(curBullet.color.substring(1),16)).toString(16);
					screen.ctx.fillText(curBullet.msg,curBullet.pos-=curBullet.spd,curBullet.line);
					screen.ctx.strokeText(curBullet.msg,curBullet.pos,curBullet.line);
					
					if(curBullet.pos<-720)
					{
						screen.lineOccupied[Math.floor(curBullet.line/numOfLine)] = 0;
						screen.bulletPod.splice(i,1);
					}
				}
			},1000/screen.playFPS);})(this);
	},
	
	pause: function()
	{
		if(!this.screenInterval)
			return;
		clearInterval(this.screenInterval);
		delete this.screenInterval;
	},
	
	stop: function()
	{
		this.pause();
		this.ctx.clearRect(0,0,this.c.width,this.c.height);
	}
}