var numOfLine = 8;
var defaultFPS = 60; //default 120fps to guerantee performance

var Screen = function(canvas)
{
	//Get a canvas to paint on
	this.c = canvas || document.getElementById('overlay') || (function(){
		canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 480;
		canvas.id = "overlay";
		document.createElement("body").appendChild(canvas);
		return canvas;
	})();
	
	//get context
	this.ctx = this.c.getContext('2d');
	
	//Show Loading bar
	var loadingBar = new LoadingBar(this.c,this.ctx);
	loadingBar.play();
	
	//set fps
	this.playFPS = defaultFPS;
	//set fontsize
	this.numOfLine = numOfLine;
	this.lineHeight = this.c.height / this.numOfLine;
	this.fontsize = Math.floor(this.lineHeight / 1.1);
	this.textHeight = this.fontsize * 1.1;
	this.textFreeSpace = this.lineHeight - this.textHeight;
	this.enterThreshold = this.c.width / 1.5; //allow to enter after
	//console.log("Text Free Space: " + this.textFreeSpace);
	
	//initial bullet container
	this.bulletPod = new Array();
	this.outBullet = 0;
	
	//initial occupation flag
	this.lineOccupied = Array();
	for(var i = 0; i < numOfLine; i++)
	{
		this.lineOccupied.push(Array());
	}
	
	//interval function pointer
	this.screenInterval = null;
	
	this.textStyleInit();
	
	this.objlog = new Array();
	//this.addLog("Screen created");
	
	//Finish Loading
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
			bullet.line = Math.floor(bullet.line % numOfLine);
			bullet.textlen = this.ctx.measureText(bullet.msg).width;
			bullet.ypos = bullet.line * this.lineHeight + Math.random() * this.textFreeSpace;
			this.bulletPod.push(bullet);
	},
	
	textStyleInit: function()
	{
		this.ctx.textAlign = 'left';
		this.ctx.textBaseline = 'top'; 
		this.ctx.font = this.fontsize + 'px Calibri';
		this.ctx.lineWidth=1;
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "black";
	},
	
	play: function()
	{
		if(this.screenInterval)//already playing
			return;
		
		this.screenInterval = (function(screen){
			return setInterval(function(){
				//refresh with a key frame
				screen.ctx.clearRect(0,0,screen.c.width,screen.c.height);
				for(var i=0;curBullet = screen.bulletPod[i];i++)
				{
					if(curBullet.out)
						continue;
					if(screen.lineOccupied[curBullet.line][curBullet.id] == null && screen.lineOccupied[curBullet.line].indexOf(true) != -1) //occupied
						continue;
					
					screen.lineOccupied[curBullet.line][curBullet.id] = true;
					screen.ctx.fillText(curBullet.msg,curBullet.pos-=curBullet.spd,curBullet.ypos);
					screen.ctx.strokeText(curBullet.msg,curBullet.pos,curBullet.ypos);
					
					if((curBullet.pos + curBullet.textlen) < screen.enterThreshold) //reach threshold, allow enter
					{
						if(screen.lineOccupied[curBullet.line][curBullet.id])
							screen.lineOccupied[curBullet.line][curBullet.id] = false;

						if(curBullet.pos < -curBullet.textlen)//exit the screen, clear bullet
						{
							screen.bulletPod[i].out = true;
							screen.outBullet++;
							
							if(screen.outBullet == screen.bulletPod.length)
							{
								screen.stop();
								screen.summary();
							}
						}
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
	},
	
	summary: function()
	{
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement("div");
		var h1 = document.createElement("h1");
		div.style.position = "absolute";
		div.style.top = "10%";
		div.style.left = "10%";
		h1.innerHTML = "Comment Summary";
		div.appendChild(h1);
		for(i=0;curBullet = this.bulletPod[i];i++)
		{
			var p = document.createElement("p");
			p.innerHTML = i + ": " + curBullet.msg;
			div.appendChild(p);
		}
		body.appendChild(div);
	}
}