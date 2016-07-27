function Coin(imgs,type){
	
	//123 银币  45金币	
	switch(type){
		case 1:
		case 2:
		case 3:
			type = 1;
			break;
		case 4:
		case 5:
			type = 2;
			break;
	}
	
	Sprite.call(this,imgs["coinAni"+type]);
	
	var size = [
		null,
		{w: 60, h: 60},
		{w: 60, h: 60}, 
	];
	
	this.w = size[type].w;
	this.h = size[type].h;
	this.type = type;
	this.count = 0;
}

Coin.prototype = new Sprite();
Coin.prototype.constructor = Coin;
 
Coin.prototype.move = function(){
	//转起来 sy
	if(this.count%4 == 0){
		this.sy += this.h;
		if(this.sy > this.h*9){
			this.sy = 0;
		}
	}
	this.count++;
	//运动
	this.x += (0 - this.x)/20;
	this.y += (700 - this.y)/20;
		
};







