(function(angular){
	"use strict"

	//初始化angular的模块
	angular.module("app",[])
		.controller("c1",["$scope","$location",function($scope,$location){
			// 1.展示任务列表
			$scope.todoList=[
				{id:1,content:"白发三千丈,缘愁似个长",isCompleted:false},
				{id:2,content:"窗前明月光,疑是地上霜",isCompleted:true},
				{id:3,content:"花间一壶酒,独酌无相亲",isCompleted:false},
				{id:4,content:"举杯邀明月,对影成三人",isCompleted:true},
				{id:5,content:"春眠不觉晓,处处闻啼鸟",isCompleted:false},
				{id:6,content:"千山鸟飞绝,万径人踪灭",isCompleted:true},
				{id:7,content:"独坐幽篁里,弹琴复长啸",isCompleted:false},
				{id:8,content:"深林人不知,明月来相照",isCompleted:true}
			]
			//2.添加一些任务
			$scope.addTodo=function(){
				// alert($scope.todoList[$scope.todoList.length-1].id +1);
				$scope.todoList.push({
					id:$scope.todoList[$scope.todoList.length-1].id+1,
					content:$scope.content,
					isCompleted:false
				})
				$scope.content="";
				return false;
			}
			//3.删除一条任务
			//需要传入每一条数据的id,才能知道删除的是哪个
			$scope.delTodo=function(id){
				$scope.todoList.forEach(function(v,i){
					if(id==v.id){
						$scope.todoList.splice(i,1);
					}
				})
			}
			//4.修改任务,给li添加editing类样式,,html页面便可控制
			// $scope.editTodo=function(id){
			// 	$scope.todoList.forEach(function(v,i){
			// 		if(id==v.id){
			// 			$scope.todoList[i].isEditing=true;
			// 		}
			// 	})
			// }
			//4.1保存修改的内容,html页面便可控制
			// $scope.saveTodo=function(id){
			// 	$scope.todoList.forEach(function(v,i){
			// 		if(id==v.id){
			// 			$scope.todoList[i].isEditing=false;
			// 		}
			// 	})
			// 	return false;
			// }
			//5.切换任务选中状态(单个或批量)
			$scope.isCheckAll=false;
			$scope.markAll=function(){
				// alert(1);
				$scope.todoList.forEach(function(v,i){
					v.isCompleted=$scope.isCheckAll;
				})
			}
			//5.1监视数据列表的变化
			$scope.$watch("todoList",function(newValue){
				var isCheckAll=$scope.todoList.every(function(v){
					return v.isCompleted;
				})
				$scope.isCheckAll=isCheckAll;
			},true)

			//6.清除已完成的任务
			$scope.clearCompleted=function(){
				// alert(1);
				//逆向思维,声明一个新的数组,只存储未完成的任务,再重新赋值给$scope.todoList
				var todoList=[];
				$scope.todoList.forEach(function(v,i){
					if(!v.isCompleted){
						todoList.push($scope.todoList[i]);
					}
				})
				$scope.todoList=todoList;
			}
			//7.显示未完成的任务数
			$scope.isnotCompleted=function(){
				var count=0;
				$scope.todoList.forEach(function(v,i){
					if(!v.isCompleted){
						count++;

					}
				})
				//console.log(count);
				return count;
			}
			//8.显示不同状态的任务以及当前任务高亮处理
			//利用筛选
			$scope.status=undefined;
			//监视hash路径变化的时候，需要将$location存放到数据模型中去
			//因为通过$scope.$watch只能监视$scope中的内容！
			$scope.$location = $location;
			$scope.$watch('$location.url()', function(newValue, oldValue){
				switch (newValue){
					case "/":
						$scope.status = undefined;
						break;
					case "/active":
						$scope.status = false;
						break;
					case "/completed":
						$scope.status = true;
						break;
				}
			}) 
		}])
})(angular)
// 1. 展示任务列表
// 2. 添加任务
// 3. 删除一条任务
// 4. 修改任务
// 5. 切换任务选中状态(单个或批量)
// 6. 清除已完成任务
// 7. 显示未完成任务数
// 8. 显示不同状态的任务
//  	   以及当前任务高亮处理
// 9. 根据URL变化显示相应任务