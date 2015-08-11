var myapp=angular.module('sampleTable',[]);
//myapp.controller('tableController', function($scope,$filter,TABLE_CONSTANTS,Input_Data){
myapp.controller("tableController", function( $scope, Input_Data ){
	$scope.headers = ["id","name","description", "field3"];
	$scope.dataPageSize = 10;
	$scope.inputData=Input_Data.dataForTable;
	$scope.orderDirection=false;
	$scope.sort = {
		sortingOrder : 'id',
		sortReverseDirection : false
	};
	$scope.setPageSize = function(pageSize){
		$scope.dataPageSize = pageSize;
		$scope.dataCurrentPage=0;
	}
});
myapp.filter("pagingFilter", function(){
	return function(input, currentPage, pageSize ){
		return input ?  input.slice(currentPage * pageSize, currentPage * ( pageSize + 1 )) : [];
	}
});