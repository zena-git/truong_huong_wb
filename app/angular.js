var app = angular.module('myApp', ['ngRoute']);

app.controller('MenuController', function($scope,$rootScope, $location) {
    $scope.isLogin = false;
    $scope.isActive = function(path) {
        return $location.path() === path;
    };

    $scope.isMenuVisible = false;

    $scope.toggleMenu = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
    };
    $scope.stopPropagation = function(event) {
        event.stopPropagation();
    };

    
});


app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: './page/home.html',
            controller: 'homeController',
        })
        .when('/login', {
            templateUrl: './login.html',
            controller: 'loginController',
        })
        .when('/home', {
            templateUrl: './page/home.html',
            
            
        })
        .when('/ve-chung-toi', {
            templateUrl: './page/ve-chung-toi.html',
            
        })
        .when('/chinh-sach-phan-phoi', {
            templateUrl: './page/chinh-sach-phan-phoi.html',
            
        })
        .when('/com-ngon', {
            templateUrl: './page/san-pham-hot.html',
            controller: 'productController',

            // templateUrl: './page/com-ngon.html',
            
        })
        .when('/dac-san', {
            templateUrl: './page/san-pham-hot.html',
            controller: 'productController',

            // templateUrl: './page/dac-san.html',
            
        })
        .when('/dang-ky-dai-hop-tac', {
            templateUrl: './page/dang-ky-dai-hop-tac.html',
            
        })
        .when('/dang-ky-dai-ly', {
            templateUrl: './page/dang-ky-dai-ly.html',
            
        })

        .when('/gao-nuong', {
            templateUrl: './page/san-pham-hot.html',
            controller: 'productController',

            // templateUrl: './page/gao-nuong.html',
            
        })
        .when('/goi-hop-tac', {
            templateUrl: './page/goi-hop-tac.html',
            
        })
        .when('/he-thong-cua-hang', {
            templateUrl: './page/he-thong-cua-hang.html',
            
        })
        .when('/lien-he', {
            templateUrl: './page/lien-he.html',
            
        })
        .when('/loi-the-mo-hinh', {
            templateUrl: './page/loi-the-mo-hinh.html',
            
        })
        .when('/quy-trinh-hop-tac', {
            templateUrl: './page/quy-trinh-hop-tac.html',
            
        })
        .when('/mot-so-hinh-anh', {
            templateUrl: './page/mot-so-hinh-anh.html',
            
        })
        // .when('/san-pham-hot', {
        //     templateUrl: './page/san-pham-hot.html',
        //     controller: 'productController',
        // })
        .when('/san-pham-hot', {
            templateUrl: './page/san-pham.html',
            controller: 'productController',
        })
        .when('/san-pham/:urlSp', {
            templateUrl: './page/san-pham-detail.html',
            controller: 'productDetailController',
        })
        .when('/tin-tuc', {
            templateUrl: './page/tin-tuc.html',
            
        })
        .when('/tin-tuc/:url', {
            templateUrl: './page/tin-tuc-new.html',
            
        })

        .when('/vi-sao-chon-chung-toi', {
            templateUrl: './page/vi-sao-chon-chung-toi.html',
            
        })

        .when('/cart', {
            templateUrl: './page/view/cart.html',
            
        })

        .otherwise({
            templateUrl: './page/home.html',
        });
});

app.controller('myController',function($scope, $rootScope, $http){
    $rootScope.lstText = [];
      $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/text/1')
      .then(function(response) {
          $rootScope.lstText = response.data;
          console.log($rootScope.lstText);
      })
      .catch(function(error) {
  
          console.error('Error loading data', error);
      }); 



})
