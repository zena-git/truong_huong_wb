var app = angular.module('myApp', ['ngRoute'],);

app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/admin', {
            templateUrl: '../admin/home.html',
            
        }) 
        .when('/footer', {
            templateUrl: '../admin/footer.html',
            
        }) 
         .when('/ve-chung-toi', {
            templateUrl: '../admin/page/ve-chung-toi.html',
            
        })
         .when('/chinh-sach-phan-phoi', {
            templateUrl: '../admin/page/chinh-sach-phan-phoi.html',
            
        })
         .when('/com-ngon', {
            templateUrl: '../admin/page/com-ngon.html',
            
        })
         .when('/dac-san', {
            templateUrl: '../admin/page/dac-san.html',
            
        })
         .when('/dang-ky-dai-hop-tac', {
            templateUrl: '../admin/page/dang-ky-dai-hop-tac.html',
            
        })
         .when('/dang-ky-dai-ly', {
            templateUrl: '../admin/page/dang-ky-dai-ly.html',
            
        })

         .when('/gao-nuong', {
            templateUrl: '../admin/page/gao-nuong.html',
            
        })
         .when('/goi-hop-tac', {
            templateUrl: '../admin/page/goi-hop-tac.html',
            
        })
         .when('/he-thong-cua-hang', {
            templateUrl: '../admin/page/he-thong-cua-hang.html',
            
        })
         .when('/lien-he', {
            templateUrl: '../admin/page/lien-he.html',
            
        })
         .when('/loi-the-mo-hinh', {
            templateUrl: '../admin/page/loi-the-mo-hinh.html',
            
        })
         .when('/quy-trinh-hop-tac', {
            templateUrl: '../admin/page/quy-trinh-hop-tac.html',
            
        })
         .when('/mot-so-hinh-anh', {
            templateUrl: '../admin/page/mot-so-hinh-anh.html',
            
        })
         .when('/san-pham', {
            templateUrl: '../admin/view/product/product.html',
            controller: 'productController'
        })

        .when('/san-pham/new', {
            templateUrl: '../admin/view/product/product-new.html',
           
        })

        .when('/san-pham/:id', {
            templateUrl: '../admin/view/product/product-edit.html',
           
        })
        .when('/order', {
            templateUrl: '../admin/view/order/order.html',
            controller: 'orderController'
           
        })

        .when('/order/:idOder', {
            templateUrl: '../admin/view/order/orderDetail.html',
            controller: 'orderDetailController'
           
        })

         .when('/tin-tuc', {
            templateUrl: '../admin/view/news/tin-tuc.html',
            
        })
        .when('/tin-tuc/new', {
            templateUrl: '../admin/view/news/tin-tuc-new.html',
            controller: 'tintucNewController'
        })
        .when('/tin-tuc-edit/:url', {
            templateUrl: '../admin/view/news/tin-tuc-detail.html',
            controller: 'tintucDetailController'
            
        })
         .when('/vi-sao-chon-chung-toi', {
            templateUrl: '../admin/page/vi-sao-chon-chung-toi.html',
            
        })
        .when('/setting-pages', {
            templateUrl: '../admin/blankpage.html',
            
        })
        .otherwise({
            templateUrl: '../admin/home.html',
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

   $scope.saveText = function(){
    var confirmation = window.confirm('Bạn có chắc chắn muốn thực hiện hành động này?');
        
    if (confirmation) {
        
        $http.put('https://6524c97cea560a22a4ea1a53.mockapi.io/text/1', $rootScope.lstText)
            .then(function(response) {
                // Xử lý kết quả sau khi PUT thành công (status code 200)
                console.log('Dữ liệu đã được cập nhật thành công.');
            })
            .catch(function(error) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật dữ liệu:', error);
            });
            alert("Dữ liệu đã được cập nhật thành công.")
    } else {
        // Hủy bỏ hành động khi người dùng không xác nhận
        console.log('Hành động đã bị hủy bỏ.');
    }
        
   }

  
})


// Tạo service
app.service('SlugService', function () {
    this.convertToSlug = function (text, randomLength) {
        var slug = text.toLowerCase()
            .replace(/[àáảãạăắằẳẵặâầấẩẫậ]/g, 'a')
            .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
            .replace(/[ìíỉĩị]/g, 'i')
            .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
            .replace(/[ùúủũụưừứửữự]/g, 'u')
            .replace(/[ỳýỷỹỵ]/g, 'y')
            .replace(/đ/g, 'd')
            .replace(/\s+/g, '-') // thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/[^a-z0-9-]/g, '') // loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
            .replace(/-+/g, '-'); // loại bỏ các dấu gạch ngang liên tiếp

       
        return slug +Math.floor(Math.random() * 10000) + 1;
    };
});
