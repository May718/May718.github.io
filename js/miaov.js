		(function(){
			var oBox = document.getElementById('fold_box');
			var fold = document.getElementById('fold');
			var oH2 = fold.getElementsByTagName('h2')[0];
			var div = document.getElementById('paper');
			var aDiv = fold.getElementsByTagName('div');
			var aA = fold.getElementsByTagName('a');
			var aSpan = fold.getElementsByTagName('span');
			var arrA = [
				'<a href="display.html" target="_blank">作品展示</a>',
				'<a href="skill.html" target="_blank">专业技能</a>',
				'<a href="phone.html">移动端作品</a>',	
				'<a href="tell.html">联系方式</a>',
			];
			var oTime = null;
			var oTimer = null;
			var iNow = 0;
			
			// 生成多组DIV
			for(var i=0; i<arrA.length; i++){
				div.innerHTML = arrA[i]+'<span></span><div></div>';
				div = div.getElementsByTagName('div')[0];
				
				setY(aA[i], i%2==0?'bottom':'top');
				setY(aSpan[i], i%2==0?'bottom':'top');
				setTranslateZ(aSpan[i], i%2==0?1:-1);
				
				i%2==0&&setRotateX(aA[i], 180);
			}
			for(var i=0; i<aDiv.length; i++){
				aDiv[i].className = 'T3D';
				setOrigin(aDiv[i], i%2==0?'bottom':'top');
			}
			
			function setOrigin(obj, val){
				obj.style.msTransformOrigin = val;
				obj.style.MozTransformOrigin = val;
				obj.style.WebkitTransformOrigin = val;
				obj.style.OTransformOrigin = val;
				obj.style.transformOrigin = val;
			}
		
			function setRotateX(obj, val){
				obj.style.msTransform = 'rotateX('+val+'deg)';
				obj.style.MozTransform = 'rotateX('+val+'deg)';
				obj.style.WebkitTransform = 'rotateX('+val+'deg)';
				obj.style.OTransform = 'rotateX('+val+'deg)';
				obj.style.transform = 'rotateX('+val+'deg)';
			}
			function setY(obj, attr){
				obj.style[attr]=0;
			}
			function setTranslateZ(obj, val){
				obj.style.msTransform = 'translateZ('+val+'px)';
				obj.style.MozTransform = 'translateZ('+val+'px)';
				obj.style.WebkitTransform = 'translateZ('+val+'px)';
				obj.style.OTransform = 'translateZ('+val+'px)';
				obj.style.transform = 'translateZ('+val+'px)';
			}			
			oBox.onmousemove = function (ev){
				var ev = ev || window.event;
				var pos = ev.clientX-this.offsetLeft;
				var deg = 25;
				var degTarget = 0;
				
				clearTimeout(oBox.timer);
				
				if(ev.clientX < this.offsetLeft+this.offsetWidth/2){
					degTarget =(deg-Math.floor(pos/100*deg))*-1;
				}else{
					degTarget = (deg-Math.floor((this.offsetWidth-pos)/100*deg));
				}
				fold.style.msTransform = 'rotateY('+degTarget+'deg)';
				fold.style.MozTransform = 'rotateY('+degTarget+'deg)';
				fold.style.WebkitTransform = 'rotateY('+degTarget+'deg)';
				fold.style.oTransform = 'rotateY('+degTarget+'deg)';
				fold.style.Transform = 'rotateY('+degTarget+'deg)';
			};
			oBox.onmouseout = function (){
				oBox.timer = setTimeout(function(){
					fold.style.msTransform = 'rotateY('+0+'deg)';
					fold.style.MozTransform = 'rotateY('+0+'deg)';
					fold.style.WebkitTransform = 'rotateY('+0+'deg)';
					fold.style.oTransform = 'rotateY('+0+'deg)';
					fold.style.Transform = 'rotateY('+0+'deg)';
				}, 1500);
			};
			
			fold.onmouseover = function (){
				clearTimeout(oTime);
				setElegant(180);
			};
			
			fold.onmouseout = function (){
				oTime = setTimeout(function(){
					setElegant(0);
				}, 300);
			};
			
			function setElegant(target){
				var dir = target==180?1:-1;
				clearInterval(oTimer);
				oTimer = setInterval(function(){
					setRotate(aDiv[iNow], target);
					iNow+=dir;
					if(iNow == aDiv.length && dir == 1 || iNow == -1 && dir == -1){
						clearInterval(oTimer);
						iNow = dir==1?aDiv.length-1:0;
					}
				}, 140);
			}
			
			function setRotate(obj, target, endFn){
				
				setTimeout(function(){
					if(obj.getElementsByTagName('span')[0])
					obj.getElementsByTagName('span')[0].style.background = target==180?'#fff':'#dfdfdf';
				}, 100);
				
				var speed = 0;
				var num = css(obj, 'rotateX');
				clearInterval(obj.timer);
				obj.timer=setInterval(function (){
					speed+=(target-css(obj, 'rotateX'))/16;
					speed*=0.8;
					num += speed;
					if(num<0)num=0;
					css(obj, 'rotateX', num);
		
					if(speed<1&&Math.abs(target-num)<1){
						clearInterval(obj.timer);
						css(obj, 'rotateX', target);
						endFn&&endFn.call(obj);
					}
				}, 30);
			}			
		})();
		
	function css(obj, attr, value){
		if(arguments.length==2){
			if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'||attr=='translateZ')
			{
				if(! obj.$Transform)
				{
					obj.$Transform={};
				}
				switch(attr)
				{
					case 'scale':
					case 'scaleX':
					case 'scaleY':
					return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
					break;
					case 'translateY':
					case 'translateX':
					case 'translateZ':
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
					break;
					default:
						return obj.$Transform[attr]?obj.$Transform[attr]:0;
				}
			}
			var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
			if(attr=='opacity'){
				return Math.round((parseFloat(sCur)*100));
			}
			else{
				return parseInt(sCur);
			}
		}
		else if(arguments.length==3)
		{
			switch(attr){
				case 'scale':
				case 'scaleX':
				case 'scaleY':
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'translateY':
				case 'translateX':
				case 'translateZ':
				setCss3(obj, attr, value);
				break;
				case 'width':
				case 'height':
				case 'paddingLeft':
				case 'paddingTop':
				case 'paddingRight':
				case 'paddingBottom':
					value=Math.max(value,0);
				case 'left':
				case 'top':
				case 'marginLeft':
				case 'marginTop':
				case 'marginRight':
				case 'marginBottom':
					if(typeof value=="string")
					{
						obj.style[attr]=value;
					}
					else
					{
						obj.style[attr]=value+'px';
					}
					break;
				case 'opacity':
					obj.style.filter="alpha(opacity:"+value+")";
					obj.style.opacity=value/100;
					break;
				default:
					obj.style[attr]=value;
			}
		}
		return function (attr_in, value_in){css(obj, attr_in, value_in)};
	}
	function setCss3(obj, attr, value){
		var sTr="";
		var sVal="";
		var arr=["Webkit","Moz","O","ms",""];
		if(! obj["$Transform"])
		{
			obj["$Transform"]={};
		}
		obj["$Transform"][attr]=parseInt(value);
		for( sTr in obj["$Transform"])
		{
			switch(sTr)
			{
				case 'scale':
				case 'scaleX':
				case 'scaleY':
				sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";	
				break;
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";	
				break;
				case 'translateY':
				case 'translateX':
				case 'translateZ':
				sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";
				break;
			}
		}
		for(var i=0;i<arr.length;i++)
		{
			obj.style[arr[i]+"Transform"]=sVal;
		}
	}	
