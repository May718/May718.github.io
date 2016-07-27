//版权 北京智能社©, 保留所有权利

function loadImages(json,fn){
	 var count = 0;
	 var len = 0;//json的长度
	 var result = {};
	 for(var name in json){
		 len++;
		 var oImg = new Image();
		 result[name] = oImg;
		 oImg.onload = function(){
			count++;
			if(count == len){
				fn && fn(result);
			}	 
		 };
		 oImg.src = json[name];
	 }
	 
}

function d2a(n){
	return n*Math.PI/180;	
}

function a2d(n){
	return n*180/Math.PI;	
}

function rnd(n,m){
	return Math.floor(Math.random()*(m-n)+n);	
}