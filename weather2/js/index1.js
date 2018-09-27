//当页面加载完成时

	//1.获取当前城市的天气
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	    dataType:"jsonp",
	    success:function(obj){
	    	tianqi=obj.data;
	    	console.log(tianqi)
	    	updata(tianqi);
	    }

	})
	//获取天气数据的函数
	function updata(tianqi){
		//获取当前的城市
		$(".citys").html(tianqi.city);
		//获取当前城市的空气状况
		$(".kongqi .wuran").html(tianqi.weather.quality_level);
		//获取当前的温度
		$(".tem .p1").html(tianqi.weather.current_temperature+"°");
		//获取当前天气状况
  	    $(".tem .p2").html(tianqi.weather.current_condition);
		/*//获取当前的风向
		$("tianqi").html(tianqi.weather.wind_condition);
		//获取当前的风级
		$("tianqi").html(tianqi.weather.wind_level+"级");*/
		
		//今天的天气
		$(".today .left .wh .tq").html(tianqi.weather.dat_condition);
		$(".today .left .tp .hightmp").html(tianqi.weather.dat_high_temperature);
	    $(".today .left .tp .lowtmp").html(tianqi.weather.dat_low_temperature+"℃");
	    $(".today .left .tp .sun img").attr("src","img/"+Number(tianqi.weather.dat_weather_icon_id)+".png");
	    
	    
	    
	    //明天的天气
	    $(".today .right .wh .tq").html(tianqi.weather.tomorrow_condition);
		$(".today .right .tp .hightmp").html(tianqi.weather.tomorrow_high_temperature);
	    $(".today .right .tp .lowtmp").html(tianqi.weather.tomorrow_low_temperature+"℃");
	    $(".today .right .tp .sun img").attr("src","img/"+Number(tianqi.weather.tomorrow_weather_icon_id)+".png");
	
	//每小时天气变化
	$(".weather ul").html("");
	let hours=tianqi.weather.hourly_forecast;
	console.log(hours);
	hours.forEach(function(val){
		let str=`<li>
					<p><span>${val.hour}</span>:00</p>
					<p class="sun"><img src="img/${val.weather_icon_id}.png" alt="" /></p>
					<p>${val.temperature+"°"}</p>
				</li> `
	    $(".weather ul").append(str);
	
	})
	
	
	//未来天气变化
	let forecasts=tianqi.weather.forecast_list;
	console.log(forecasts);
	$(".futher ul").html("");
	forecasts.forEach(function(v){
		
		let str=`<li>
					<p class="one">日期</p>
					<p class="two">${v.date}</p>
					<p class="three">${v.condition}</p>
					<p class="four" ><img src="img/${v.weather_icon_id}.png" alt=""/></p>
				
				    <p class="four" style="margin-top: 1.4rem;"><img src="img/${v.weather_icon_id}.png" alt=""/></p>
				    <p class="one">${v.condition}</p>
					<p class="two">${v.wind_direction}</p>
					<p class="three">${v.wind_level}</p>
				</li> `
	    $(".futher ul").append(str);
	
	})
	}
	

	//点击城市
	$(".city").click(function(){
		$(".search").css("height","auto");
		$(".futher").css("display","none");
		$(".footer").css("display","none");
		$(".living-scroll").css("display","none");
	})
	//点击取消
	$(".btn-cancel").click(function(){
		$(".search").css("height","0");
		$(".futher").css("display","block");
		$(".footer").css("display","block");
		$(".living-scroll").css("display","block");
	})
	
	
	
	//获取城市
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	    dataType:"jsonp",
	    success:function(obj){
	    	city=obj.data;
	    	console.log(city)
	    	updataCity(city);
	    }
	})
	//获取每个城市信息
	function updataCity(city){
		let k=0;
		for(let i in city){
			let str=`
				  <div class="ct-hot-city">
				
				<div class="hotscenic">
					  <ul class="province">
					  	<h2>${i}</h2>
					  </ul>
					  <ul class="somecity">
					  </ul>
				</div>
				
			</div>
				`
			$(".search").append(str);
			for(let j in city[i]){
				console.log(j);
				let str1=`<li>${j}</li>`
				$(".somecity").eq(k).append(str1);
			}
			k++;
	       	   
	       }
	    }
	
	//点击每一个城市，获取当前城市的天气信息
     window.onload=function(){
     	$("li").click(function(){
     		$(".search").css("height","0");
			$(".futher").css("display","block");
			$(".footer").css("display","block");
			$(".living-scroll").css("display","block");
     		let con=$(this).html();
     		console.log(con);
     		ajaxs(con);
     	})
     	//获取某个城市的天气信息
     	function ajaxs(str){
     		let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
     	    $.ajax({
     	    	type:"get",
     	    	url:url1,
     	    	dataType:"jsonp",
     	    	success:function(obj){
     	    		let tianqi2=obj.data;
     	    		updata(tianqi2);
     	    	}
     	    })
     	
     	}
     	
     	//在搜索框内输入内容，可以搜素当前城市的天气情况
		$("input").focus(function(){
			$(".search .btn-cancel").html("搜索");
			
		})
		//当点击搜索时，获取input中的内容进行搜索
		$(".search .btn-cancel").click(function(){
			$(".search").css("height","0");
			$(".futher").css("display","block");
			$(".footer").css("display","block");
			$(".living-scroll").css("display","block");
			let text=$("input").val();
			//ajaxs(text);
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						ajaxs(text);
					}
				}

			}
			alert("该城市不存在");
			
		})
     	
     }

	
	


/*
 1.获取默认城市的天气信息
2.获取所有城市的信息
3.点击每一个城市可以获取当前城市的天气信息
4.在搜索框内输入要搜索的城市,点击搜索按钮可以进行搜索
  */