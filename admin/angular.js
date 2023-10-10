var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/admin', {
            templateUrl: '../admin/home.html',
            
        }) 
        .when('/page/home', {
            templateUrl: '../admin/page/home.html',
            
        })
        .when('/page/ve-chung-toi', {
            templateUrl: '../admin/page/ve-chung-toi.html',
            
        })

         .when('/page/ve-chung-toi', {
            templateUrl: '../admin/page/ve-chung-toi.html',
            
        })
         .when('/page/chinh-sach-phan-phoi', {
            templateUrl: '../admin/page/chinh-sach-phan-phoi.html',
            
        })
         .when('/page/com-ngon', {
            templateUrl: '../admin/page/com-ngon.html',
            
        })
         .when('/page/dac-san', {
            templateUrl: '../admin/page/dac-san.html',
            
        })
         .when('/page/dang-ky-dai-hop-tac', {
            templateUrl: '../admin/page/dang-ky-dai-hop-tac.html',
            
        })
         .when('/page/dang-ky-dai-ly', {
            templateUrl: '../admin/page/dang-ky-dai-ly.html',
            
        })

         .when('/page/gao-nuong', {
            templateUrl: '../admin/page/gao-nuong.html',
            
        })
         .when('/page/goi-hop-tac', {
            templateUrl: '../admin/page/goi-hop-tac.html',
            
        })
         .when('/page/he-thong-cua-hang', {
            templateUrl: '../admin/page/he-thong-cua-hang.html',
            
        })
         .when('/page/lien-he', {
            templateUrl: '../admin/page/lien-he.html',
            
        })
         .when('/page/loi-the-mo-hinh', {
            templateUrl: '../admin/page/loi-the-mo-hinh.html',
            
        })
         .when('/page/quy-trinh-hop-tac', {
            templateUrl: '../admin/page/quy-trinh-hop-tac.html',
            
        })
         .when('/page/mot-so-hinh-anh', {
            templateUrl: '../admin/page/mot-so-hinh-anh.html',
            
        })
         .when('/page/san-pham-hot', {
            templateUrl: '../admin/page/san-pham-hot.html',
        })

         .when('/page/tin-tuc', {
            templateUrl: '../admin/page/tin-tuc.html',
            
        })

         .when('/page/vi-sao-chon-chung-toi', {
            templateUrl: '../admin/page/vi-sao-chon-chung-toi.html',
            
        })
        .otherwise({
            templateUrl: '../admin/home.html',
        });
});

