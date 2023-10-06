var app = angular.module('myApp', ['ngRoute']);

app.controller('MenuController', function($scope, $location) {
    $scope.isActive = function(path) {
        return $location.path() === path;
    };

    $scope.isMenuVisible = false;

    $scope.toggleMenu = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
    };

});


app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: '/page/home.html',
            controller: 'homeController',
        })
        .when('/home', {
            templateUrl: '/page/home.html',
            
            
        })
        .when('/ve-chung-toi', {
            templateUrl: '/page/ve-chung-toi.html',
            
        })
        .when('/chinh-sach-phan-phoi', {
            templateUrl: '/page/chinh-sach-phan-phoi.html',
            
        })
        .when('/com-ngon', {
            templateUrl: '/page/com-ngon.html',
            
        })
        .when('/dac-san', {
            templateUrl: '/page/dac-san.html',
            
        })
        .when('/dang-ky-dai-hop-tac', {
            templateUrl: '/page/dang-ky-dai-hop-tac.html',
            
        })
        .when('/dang-ky-dai-ly', {
            templateUrl: '/page/dang-ky-dai-ly.html',
            
        })

        .when('/gao-nuong', {
            templateUrl: '/page/gao-nuong.html',
            
        })
        .when('/goi-hop-tac', {
            templateUrl: '/page/goi-hop-tac.html',
            
        })
        .when('/he-thong-cua-hang', {
            templateUrl: '/page/he-thong-cua-hang.html',
            
        })
        .when('/lien-he', {
            templateUrl: '/page/lien-he.html',
            
        })
        .when('/loi-the-mo-hinh', {
            templateUrl: '/page/loi-the-mo-hinh.html',
            
        })
        .when('/quy-trinh-hop-tac', {
            templateUrl: '/page/quy-trinh-hop-tac.html',
            
        })
        .when('/mot-so-hinh-anh', {
            templateUrl: '/page/mot-so-hinh-anh.html',
            
        })
        .when('/san-pham-hot', {
            templateUrl: '/page/san-pham-hot.html',
            controller: 'productController',
        })

        .when('/tin-tuc', {
            templateUrl: '/page/tin-tuc.html',
            
        })

        .when('/vi-sao-chon-chung-toi', {
            templateUrl: '/page/vi-sao-chon-chung-toi.html',
            
        })
        .otherwise({
            templateUrl: '/page/home.html',
        });
});
