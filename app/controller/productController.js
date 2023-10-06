app.controller('productController',function($scope,$http,$location){
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";

    $scope.lstProduct = [];

    $http.get(url).then(function(response){
        $scope.lstProduct = response.data;
        console.log($scope.lstProduct);
    });

})