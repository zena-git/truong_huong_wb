app.controller('productController', function ($scope, $http, $location, $routeParams) {
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";

    $scope.lstProduct = [];

    $http.get(url).then(function (response) {
        $scope.lstProduct = response.data;
        if (angular.isUndefined($scope.lstProduct)) {
            $location.path('/home');
        }
        console.log($scope.lstProduct);
    });

})

app.controller('productDetailController', function ($scope, $http, $routeParams, $location) {
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";
    $scope.currentURL = $location.absUrl();
    $scope.url = $routeParams.urlSp;
    $scope.product = [];
    $http.get(url + "?url=" + $scope.url)
        .then(function (response) {
            $scope.product = response.data[0];
            console.log($scope.product);
        })
})


