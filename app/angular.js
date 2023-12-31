var app = angular.module('myApp', ['ngRoute','LocalStorageModule']);

app.controller('MenuController', function($scope,$rootScope, $location,localStorageService) {
   
    
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
    $rootScope.countCart = 0;
    var cart = localStorageService.get('cart') || [];
    if (cart && angular.isArray(cart)) {
     
        $rootScope.countCart = cart.length;
    } else {
        $rootScope.countCart = 0; // Nếu 'cart' không tồn tại hoặc không phải là mảng, thiết lập giá trị mặc định.
    }
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
            templateUrl: './page/gao-nuong.html',
            // templateUrl: './page/san-pham.html',
            controller: 'productController',

            
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
        .when('/buy', {
            templateUrl: './page/view/buy.html',
            
        })
        .when('/job/nhan-vien-kinh-doanh', {
            templateUrl: '/page/job/nhan-vien-kinh-doanh.html',
            
        })
        .when('/job/nhan-vien-phat-trien', {
            templateUrl: '/page/job/nhan-vien-phat-trien.html',
            
        })
        .when('/job/nhan-vien-van-phong', {
            templateUrl: '/page/job/nhan-vien-van-phong.html',
            
        })

        .otherwise({
            templateUrl: './page/home.html',
        });
});
// app.run(['$rootScope', '$window', function($rootScope, $window) {
//     $rootScope.$on('$routeChangeSuccess', function() {
//         console.log('Route change success. Scrolling to top.');
//         setTimeout(function() {
//             $window.scrollTo(0, 0);
//             console.log("lee");
//         }, 1000); // Adjust the delay as needed
//     });
// }]);

app.run(function ($rootScope,$window) {
    $rootScope.$on('$routeChangeSuccess', function () {
        var scrollTop = $window.pageYOffset || document.documentElement.scrollTop;
        var scrollLeft = $window.pageXOffset || document.documentElement.scrollLeft;
        console.log(scrollTop);
        console.log(scrollLeft);
        $window.scrollTo();
        console.log($window.scrollY);
    });
});
app.service('sharedDataService', function () {
    var sharedData = {};
  
    return {
      getSharedData: function () {
        return sharedData;
      },
      setSharedData: function (data) {
        sharedData = data;
      }
    };
  });

app.controller('myController',function($scope, $rootScope, $http,localStorageService){
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
