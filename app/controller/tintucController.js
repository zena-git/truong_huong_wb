app.controller('tintucController',function($scope,$http,$location, $routeParams,$window){
    

    var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
    $scope.lstTinTuc = [];
    $scope.lstTinTucHot = [];

    $http.get(url)
    .then(function(response){
        $scope.lstTinTuc = response.data;  
        $scope.lstTinTucHot = angular.copy($scope.lstTinTuc);
        $scope.lstTinTucHot.sort(function(a, b) {
          return b.view - a.view;
      });
     
    });

    
    


})

app.controller('tintucNewController',function($scope,$http,$location, $routeParams,$window){


    $scope.url = $routeParams.url;
    $scope.tinTuc = [];
    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news?url='+$scope.url)
    .then(function(response){
        $scope.tinTuc = response.data[0];
        $http.put('https://6524c97cea560a22a4ea1a53.mockapi.io/news/'+$scope.tinTuc.id, {
          view: $scope.tinTuc.view+1
        })   
    });

    var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
    $scope.filterTinTuc = [];
    $http.get(url)
    .then(function(response){
      $scope.filterTinTuc = response.data.filter(function(obj) {
        return obj.url !== $scope.url;
      });

      console.log( $scope.filterTinTuc );
                 
    });

});