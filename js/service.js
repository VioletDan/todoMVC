(function(angular){
	angular.module("app.data",[])
	.config(["$locationProvider",function($locationProvider){
			$locationProvider.hashPrefix("");
		}])
	.service("todoList",["$window",function($window){
		//将数据存入到localStorage中
		// var localStorage=$window.localStorage;
		// var todoList=JSON.parse(localStorage.getItem("todoList"));
		// if(todoList==null){
		// 	todoList=[{id:1,content:"白发三千丈,缘愁似个长",isCompleted:false}];
		// 	return;
		// }
		var todoList=[
				{id:1,content:"白发三千丈,缘愁似个长",isCompleted:false},
				{id:2,content:"窗前明月光,疑是地上霜",isCompleted:true},
				{id:3,content:"花间一壶酒,独酌无相亲",isCompleted:false},
				{id:4,content:"举杯邀明月,对影成三人",isCompleted:true},
				{id:5,content:"春眠不觉晓,处处闻啼鸟",isCompleted:false},
				{id:6,content:"千山鸟飞绝,万径人踪灭",isCompleted:true},
				{id:7,content:"独坐幽篁里,弹琴复长啸",isCompleted:false},
				{id:8,content:"深林人不知,明月来相照",isCompleted:true}
		]
		this.save=function(){
			localStorage.setItem("todoList",JSON.stringify(todoList));
		}
		this.getData=function(){
			return todoList;
		}
		this.add=function(todo){
			todoList.push(todo);
		}
		this.del=function(id){
			todoList.forEach(function(v,i){
				if(id==v.id){
					todoList.splice(i,1);
				}
			})
		}
		this.clearCompleted=function(){
			//为了不改变最终tosoList指向问题,要先设置一个中间变量,用来存储要展示得到数据
			//接着清空原有数组,将临时变量里的内容存储到里面去,这样todoList还是原来的那个todoList
			var tempList=[];
			todoList.forEach(function(v,i){
				if(!v.isCompleted){
					tempList.push(todoList[i]);
				}
			})
			//清空原有数组
			todoList.length=0;
			tempList.forEach(function(v,i){
				todoList.push(tempList[i]);
			})
		}
		this.getLeftCount=function(){
			var count=0;
			todoList.forEach(function(v,i){
				if(!v.isCompleted){
					count++;

				}
			})
			return count;
		}
	}])
})(angular)