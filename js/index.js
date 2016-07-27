//版权 北京智能社©, 保留所有权利
window.onload = function(){
	var oC = document.getElementById("c1");
	var gd = oC.getContext("2d");
 
 	loadImages({
		fish1 : "img/fish1.png",
		fish2 : "img/fish2.png",
		fish3 : "img/fish3.png",
		fish4 : "img/fish4.png",
		fish5 : "img/fish5.png",
		bottom: "img/bottom.png",
		bullet: "img/bullet.png",
		cannon1: "img/cannon1.png",
		cannon2: "img/cannon2.png",
		cannon3: "img/cannon3.png",
		cannon4: "img/cannon4.png",
		cannon5: "img/cannon5.png",
		cannon6: "img/cannon6.png",
		cannon7: "img/cannon7.png",
		coinAni1: "img/coinAni1.png",
		coinAni2: "img/coinAni2.png",
		web: "img/web.png"
	},function(imgs){
		
		//生成一堆鱼
		var aFish = [];
		setInterval(function(){
			
			var f = new Fish(imgs,rnd(1,6)); 
			
			if(Math.random() < 0.5){
				f.x = -100;
			} else {
				f.x = oC.width+100;
				f.rotate = -90;
			}
			f.y = rnd(0,oC.height);
			aFish.push(f);
		},100);
		 
		 
		//炮台
		var bottom = new Sprite(imgs.bottom);
		bottom.w = 764;
		bottom.h = 70;
		bottom.x = oC.width/2;
		bottom.y = oC.height - bottom.h/2;
		
		var cannon = new Cannon(imgs,7);
		cannon.x = 434;
		cannon.y = 560;
		
		
		oC.onmousemove = function(ev){
			
			var x = ev.clientX - oC.offsetLeft - cannon.x;
			var y = oC.offsetTop + cannon.y - ev.clientY;
			
			var a = 90 - a2d(Math.atan2(y,x));
			 
			cannon.rotate = a;	 
		};
		 
		//点击开炮
		var aBullet = [];
		oC.onclick = function(){
			var b = new Bullet(imgs.bullet,cannon.type);
			b.x = cannon.x;
			b.y = cannon.y;
			b.speed = 5;
			b.rotate = cannon.rotate;
			aBullet.push(b); 
		};
		
		//存金币
		var　aCoin = [];
		//存死鱼
		var aDieFish = [];
		//存网
		var aWeb = [];		 
		 
		setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			
			for(var i = 0; i　< aFish.length; i++){
				aFish[i].draw(gd);
				aFish[i].move();
			}			
			//炮台
			bottom.draw(gd);
			
			//炮筒
			cannon.draw(gd);
			
			//炮弹
			for(var i = 0; i　< aBullet.length; i++){
				aBullet[i].draw(gd);
				aBullet[i].move();
			}
			
			
			//绘制金币
			for(var i = 0; i　< aCoin.length; i++){
				aCoin[i].draw(gd);
				aCoin[i].move();
			}
			//绘制死鱼
			for(var i = 0; i　< aDieFish.length; i++){
				aDieFish[i].draw(gd);
				aDieFish[i].move();
				
				setTimeout(function(){
					aDieFish.splice(i--,1);
				},300);
			}
			
			//绘制渔网
			for(var i = 0; i　< aWeb.length; i++){
				aWeb[i].draw(gd);
				aWeb[i].scale += 0.1;
				
				if(aWeb[i].scale > 1.2){
					aWeb[i].scale = 1;
					aWeb.splice(i--,1);
				}
			}
			
			//碰撞检测
			for(var i = 0; i < aBullet.length; i++){
				for(var j = 0; j < aFish.length; j++){
					if(aBullet[i].collTest(aFish[j])){
						var x = aFish[j].x;
						var y = aFish[j].y;
						var type = aFish[j].type;
						var roate = aFish[j].rotate;
						
						aFish.splice(j--,1);
						aBullet.splice(i--,1);
						
						var coin = new Coin(imgs,type);
						coin.x = x;
						coin.y = y;
						aCoin.push(coin);
						
						//死鱼
						var f = new DieFish(imgs,type);
						f.x = x;
						f.y = y;
						aDieFish.push(f);
						
						//网
						var　web = new Web(imgs.web,type);
						web.x = x;
						web.y = y;
						aWeb.push(web);
						
					}
				}
			}
			//清空资源
			for(var i = 0; i < aFish.length; i++){
				
				if(aFish[i].x < -100 || aFish[i].x >= oC.width+100 || aFish[i].y < -100 || aFish[i].y > oC.height+100){
					aFish.splice(i--,1);
				}
			}
			for(var i = 0; i < aBullet.length; i++){
				
				if(aBullet[i].x < -100 || aBullet[i].x >= oC.width+100 || aBullet[i].y < -100 || aBullet[i].y > oC.height+100){
					aBullet.splice(i--,1);
				}
			} 
		},30);
		
	});
 	
};
