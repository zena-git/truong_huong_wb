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
    $scope.lstProductSale = [];

    $http.get('https://65420720f0b8287df1ff59f4.mockapi.io/sale').then(function (response) {
        $scope.lstProductSale = response.data;
    });

})

app.controller('productDetailController', function ($scope, $http, $routeParams, $location, $window) {
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";
    $scope.currentURL = $location.absUrl();
    $scope.url = $routeParams.urlSp;
    $scope.encodedUrlQR = $window.encodeURIComponent($scope.currentURL);;
    $scope.product = [];
    $http.get(url + "?url=" + $scope.url)
        .then(function (response) {
            $scope.product = response.data[0];

            console.log($scope.product);
        })
})

app.controller('productAddBuyController', function ($scope, $rootScope, $http, $location, $window, localStorageService) {



    var localStorage = localStorageService.get('cart') || [];

    let input_quantity = document.getElementById("input_quantity");
    $scope.addCart = function (pro) {

        var cart = {
            product: {},
            quantity: {},
        }
        $rootScope.lstCart = localStorageService.get('cart') || [];

        var productIndex = $rootScope.lstCart.findIndex(item => item.product.id === pro.id);
        console.log(productIndex);
        if (productIndex != -1) {
            console.log($rootScope.lstCart[productIndex]);
            $rootScope.lstCart[productIndex].quantity = parseInt($rootScope.lstCart[productIndex].quantity) + parseInt(input_quantity.value);
            localStorageService.set('cart', $rootScope.lstCart)
        } else {
            cart.product = pro;
            cart.quantity = input_quantity.value;
            $rootScope.lstCart.push(cart);
            localStorageService.set('cart',  $rootScope.lstCart)
            $rootScope.countCart++;

        }



    }

    $scope.buyProduct = function (pro) {
        var cart = {
            product: {},
            quantity: {},
        }
        $rootScope.lstCart = localStorageService.get('cart') || [];
        let input_quantity = document.getElementById("input_quantity");

        var productIndex = $rootScope.lstCart.findIndex(item => item.product.id === pro.id);
        console.log(productIndex);
        if (productIndex != -1) {
            console.log($rootScope.lstCart[productIndex]);
            $rootScope.lstCart[productIndex].quantity = parseInt($rootScope.lstCart[productIndex].quantity) + parseInt(input_quantity.value);
            localStorageService.set('cart', $rootScope.lstCart)
        } else {

            cart.product = pro;
            cart.quantity = input_quantity.value;
            localStorage.push(cart);
            localStorageService.set('cart', localStorage)
            console.log(localStorage);
            $rootScope.countCart++;
        }
        $location.path('/cart')
    }
})

