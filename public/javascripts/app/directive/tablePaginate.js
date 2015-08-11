myapp.directive("sortTable", function() {
	return {
		restrict: 'A',
		transclude: true,    
		scope: {
			headerName: '=',
			customSort: '='
		},
		template : 
			'<a ng-click="sort_by(headerName)"">'+
			'	<span ng-transclude></span>'+
			'	<i ng-class="selectedCls(headerName)"></i>'+
			'</a>',
		link: function(scope) {

		// change sorting customOrder
		scope.sort_by = function(newSortingOrder) {
			var customSort = scope.customSort;

			if (customSort.sortingOrder == newSortingOrder){
				customSort.sortReverseDirection = !customSort.sortReverseDirection;
			}

			customSort.sortingOrder = newSortingOrder;
		};


		scope.selectedCls = function(column) {
			if(column == scope.customSort.sortingOrder){
				return ('icon-chevron-' + ((scope.customSort.sortReverseDirection) ? 'down' : 'up'));
			}
			else{
				return'icon-sort'
		 	} 
		};
		}// end link
	}
});


/*myapp.directive("sortTable", function(){
	return{
		restrict:'A',
		transclude:true,
		scope:{
			headerName:'=',
			orderDirection:'='
		},
		template:
		'<a ng-class="{\'sortBy\' : head == orderHeader,\'asc\':head == orderHeader && orderDirection == true,\'desc\':head == orderHeader && orderDirection == false}", ng-click=\'orderTableBy(headerName)\'>'+
		'	<span ng-transclude></span>'+
		'</a>',
		link:function(scope){
			scope.orderTableBy = function(header){
				console.log('Before: '+scope.orderHeader+' '+scope.orderDirection+' '+header);
				if ( scope.orderHeader == header && scope.orderDirection == false){
					scope.orderHeader = null; // clear sort.
				}
				else if ( scope.orderHeader == header ){
					scope.orderDirection = false;
				}else{
					scope.orderHeader = header;
					scope.orderDirection = true;
				}
				console.log('After: '+scope.orderHeader+' '+scope.orderDirection+' '+header);
			};
		}
	}
});*/

myapp.directive("paging", function(){
	return {
		template:'<div>'+
		'<ul><button ng-disabled="!hasPrevious()" ng-click="onFirst()"> First </button>'+
		'<button ng-disabled="!hasPrevious()" ng-click="onPrev()"> Previous </button> '+
		'{{start()}} - {{end()}} out of {{size()}} '+
		'<button ng-disabled="!hasNext()" ng-click="onNext()"> Next </button>'+
		'<button ng-disabled="!hasNext()" ng-click="onLast()"> Last </button>'+
		'<div ng-transclude=""></div> '+
		'</div>',
		restrict:'AEC',
		transclude:true,
		scope:{
			'currentPage':'=',
			'pageSize':'=',
			'data':'&'
			},
			link:function(scope, element, attrs){
			scope.size = function(){
				return angular.isDefined(scope.data()) ? scope.data().length : 0;
			};
			scope.end = function(){
				if(scope.hasNext()){
					return scope.start() + scope.pageSize;
				}else{
					return scope.size();
				}
				
			};
			scope.start = function(){
				return scope.currentPage * scope.pageSize;
			};
			scope.page = function(){
				return !!scope.size() ? ( scope.currentPage + 1 ) : 0;
			};
			scope.hasNext = function(){
				return scope.page() < ( scope.size() /  scope.pageSize )  ;
			};
			scope.onFirst = function(){
				scope.currentPage = 0;
			};
			scope.onLast = function(){
				scope.currentPage = parseInt(( scope.size() /  scope.pageSize ));
				console.log(scope.currentPage);
			};
			scope.onNext = function(){
				scope.currentPage = parseInt(scope.currentPage) + 1;
			};
			scope.hasPrevious = function(){
				return !!scope.currentPage;
			} ;
			scope.onPrev = function(){
				scope.currentPage=scope.currentPage-1;
			};
			try{
				if ( typeof(scope.data) == "undefined"){
					scope.data = [];
				}
				if ( typeof(scope.currentPage) == "undefined" ){
					scope.currentPage = 0;
				}
				if ( typeof(scope.pageSize) == "undefined"){
					scope.pageSize = 10;
				}
			}catch(e){ console.log(e);}
		}
	}
})