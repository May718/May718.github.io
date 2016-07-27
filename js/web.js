function Web(oImg,type){
	Sprite.call(this,oImg);
	
	var size = [
		null,
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200},
		{sx:22,sy:22,w: 200, h: 200}
	];
	
	this.w = size[type].w;
	this.h = size[type].h;
	this.type = type;
	this.scale = 0.5;
}

Web.prototype = new Sprite();
Web.prototype.constructor = Web;

Web.prototype.draw = function(gd){
	gd.save();
	
	gd.translate(this.x,this.y);
	
	gd.scale(this.scale,this.scale);
	
	gd.drawImage(
		this.oImg,
		this.sx,this.sy,this.w,this.h,
		-this.w/2,-this.h/2,this.w,this.h
	);
	
	gd.restore();
};









