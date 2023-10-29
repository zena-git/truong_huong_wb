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

app.controller('productDetailController', function ($scope, $http, $routeParams, $location, $window) {
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";
    $scope.currentURL = $location.absUrl();
    $scope.url = $routeParams.urlSp;
    $scope.encodedUrlQR =  $window.encodeURIComponent($scope.currentURL);;
    $scope.product = [];
    $http.get(url + "?url=" + $scope.url)
        .then(function (response) {
            $scope.product = response.data[0];
          
            console.log($scope.product);
        })
})

app.controller('productAddBuyController', function ($scope,$rootScope,$http,  $location, $window){
 
    $rootScope.account = {
        id: 1,
        username: "admin",
        password: "admin"
    };

    $scope.billDetail = {
        idBill: "",
        idProduct: "",
        quantity: "",
    }
    let input_quantity = document.getElementById("input_quantity");
    $scope.addCart = function(product){
        let idBillDetail = $rootScope.bill.id;
        $scope.billDetail.idBill = idBillDetail;
        $scope.billDetail.idProduct = product.id;
        $scope.billDetail.quantity = input_quantity.value;
        $http.post('https://653b6e8f2e42fd0d54d518a5.mockapi.io/billDetail', $scope.billDetail )
        .then(function (response) {
            cart();
        });
       
    }

    $scope.buyProduct = function(product){
        console.log(product);
    }
})

