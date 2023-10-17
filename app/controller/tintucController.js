app.controller('tintucController',function($scope,$http,$location, $routeParams){
    
    
    var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
    $scope.lstTinTuc = [];
    $http.get(url)
    .then(function(response){
        $scope.lstTinTuc = response.data;
        console.log($scope.lstTinTuc);
                 
    });


    


})

app.controller('tintucNewController',function($scope,$http,$location, $routeParams){
    $scope.url = $routeParams.url;
    $scope.tinTuc = [];
    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news?url='+$scope.url)
    .then(function(response){
        $scope.tinTuc = response.data[0];
        console.log($scope.tinTuc);      
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