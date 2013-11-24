String.prototype.repeat = function( num )
{
    return new Array(num + 1).join( this );
}

function LoadingBar(canvas, context){
	this.counter = 0;
	this.c = canvas;
	this.ctx = context;
	this.loadInterval = null;
	
};

LoadingBar.prototype =
{
	play: function()
	{
		if(this.loadInterval)
			return;
			
		this.ctx.textAlign = 'center';

		this.loadInterval = (function(canvas,context,counter){
			return setInterval(function(){
				context.clearRect(0,0,canvas.width,canvas.height);
				context.fillText('Loading'+('.').repeat(counter=++counter%5),canvas.width/2,canvas.height/2)
			},100);})(this.c,this.ctx,this.counter);
	},
	
	stop: function()
	{
		clearInterval(this.loadInterval);
		delete this.loadInterval;
		this.counter = 0;
		this.ctx.clearRect(0,0,this.c.width,this.c.height);
	}
}