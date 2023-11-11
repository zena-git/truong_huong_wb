
app.controller('productController', function ($scope, $rootScope, $http, $location, $routeParams, SlugService) {
    $scope.lstProduct = [];
    $scope.category = '';
    $scope.properties = '';
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";
    $http.get(url).then(function (response) {
        $scope.lstProduct = response.data;
        console.log($scope.lstProduct);
    });

    $rootScope.form_product = {
        createdAt: new Date(),
        name: "",
        avatar: [],
        price: 0,
        capitalPrice: 0,
        listedPrice: 0,
        properties: [],
        mass: "",
        description: "",
        url: "nep-nuong",
        quantity: 0,
        category: [],
        code: ""
    }
    
    $scope.changePrice = function(){
        $rootScope.form_product.price = Math.floor($rootScope.form_product.listedPrice * 0.97); // Giảm giá 3%
    }
    
    $scope.addProduct = function () {

        $scope.form_product.url = SlugService.convertToSlug($rootScope.form_product.name)+  Math.floor(Math.random() * 10000) + 1 ;
        $http.post(url, $rootScope.form_product)
        .then(function (response) {
            $http.get(url).then(function (response) {
                $scope.lstProduct = response.data;
                alert("Thêm thành công")
                $location.path('/san-pham')
            });
        });
    }
    $scope.addCategory = function () {
        if (!$rootScope.form_product.category) {
            $rootScope.form_product.category = [];
        }
        $rootScope.form_product.category.push($scope.category);
        $scope.category ="";
    }
    $scope.addPropotity = function () {
        if (!$rootScope.form_product.properties) {
            $rootScope.form_product.properties = [];
        }
     
        $rootScope.form_product.properties.push($scope.properties);
        $scope.properties ="";
    }


    $scope.deleteCategory = function (index) {
        $rootScope.form_product.category.splice(index, 1);
    }

    $scope.deletePropotity = function (index) {
        $rootScope.form_product.properties.splice(index, 1);
    }
    $scope.deleteImgPro = function(index) {
        if ($rootScope.form_product.avatar) {
            $rootScope.form_product.avatar.splice(index, 1);
        }
    }
    $scope.deleteProduct = function(id){
        var confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmed){
            var url = "https://63f23863f28929a9df564ecd.mockapi.io/product";
            $http.delete(url+"/" + id).then(function (response) {
                $http.get(url).then(function (response) {
                    $scope.lstProduct = response.data;
                });
            });
        }
        
    }

})

app.controller('productDetailController', function ($scope, $rootScope, $http, $location, $routeParams) {
    
    var id = $routeParams.id;
    $scope.category = '';
    $scope.properties = '';
    $rootScope.form_product_update = {
        createdAt: new Date(),
        name: "",
        avatar: "",
        price: 0,
        listedPrice: 0,
        capitalPrice: 0,
        properties: [],
        mass: "",
        description: "",
        url: "",
        quantity: 0,
        category: [],
        code: ""
    }
    $scope.changePrice = function(){
        $rootScope.form_product_update.price = Math.floor($rootScope.form_product_update.listedPrice * 0.97); // Giảm giá 3%
    }
    var url = "https://63f23863f28929a9df564ecd.mockapi.io/product/";
    $http.get(url+id).then(function (response) {
        $rootScope.form_product_update = response.data;
        console.log($rootScope.form_product_update);
    });

    
   


    $scope.updateProduct = function () {
        $http.put(url+id,$rootScope.form_product_update)
        .then(function(response){
             $http.get(url).then(function (response) {
                $scope.lstProduct = response.data;
                alert("Update Thành Công")
                $location.path('/page/san-pham')
            });
        })
    };

    $scope.deleteImgPro = function(index) {
        if ($rootScope.form_product_update.avatar) {
            $rootScope.form_product_update.avatar.splice(index, 1);
        }
    }

    $scope.addCategory = function () {
        if (!$rootScope.form_product_update.category) {
            $rootScope.form_product_update.category = [];
        }
        $rootScope.form_product_update.category.push($scope.category);
        $scope.category ="";
    }
    $scope.addPropotity = function () {
        if (!$rootScope.form_product_update.properties) {
            $rootScope.form_product_update.properties = [];
        }
     
        $rootScope.form_product_update.properties.push($scope.properties);
        $scope.properties ="";
    }


    $scope.deleteCategory = function (index) {
        console.log(index);
        $rootScope.form_product_update.category.splice(index, 1);
    }

    $scope.deletePropotity = function (index) {
        $rootScope.form_product_update.properties.splice(index, 1);
    }


})


// app.directive('fileModel', ['$parse','fileUpload', function ($parse, fileUpload) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;

//             element.bind('change', function () {
//                 scope.$apply(function () {
//                     modelSetter(scope, element[0].files);
//                 });

//                 const CLOUD_NAME = "dgxbxvkso";
//                 const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

//                 var files = Array.from(element[0].files);
//                 console.log('file is ');
//                 console.log(files);
//                 console.dir(files);
//                 files.forEach(file => {
//                     fileUpload.uploadFileToUrl(file, API_URL);
//                 });
//             });
//         }
//     };
// }]);

// app.service('fileUpload', ['$http', '$rootScope', '$injector', function ($http, $rootScope, $injector) {
//     this.uploadFileToUrl = function (file, uploadUrl) {
//         const UPLOAD_PRESET = "upload_truonghuong";
//         var fd = new FormData();
//         fd.append('file', file);
//         fd.append("upload_preset", "upload_truonghuong");

//         // Sử dụng $injector để inject $rootScope
//         var $rootScope = $injector.get('$rootScope');
//         var imageArray = [];
//         $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             headers: { 'Content-Type': undefined }
//         })
//             .then(function (response) {
//                 var url = response.data.secure_url;
//                 // Lấy đường dẫn hiện tại
//         var currentURL = window.location.href;
//                 // Đảm bảo rằng avatar là một mảng
//                 if (currentURL.includes("/san-pham/new")) {
//                     // Đảm bảo rằng avatar là một mảng
//                     if (!$rootScope.form_product.avatar) {
//                         $rootScope.form_product.avatar = [];
//                     }
//                     // Thêm url vào mảng avatar
//                     $rootScope.form_product.avatar.push(url);
//                 }else{
//                     if (!$rootScope.form_product_update.avatar) {
//                         $rootScope.form_product_update.avatar = [];
//                     }
//                     // Thêm url vào mảng avatar
//                     $rootScope.form_product_update.avatar.push(url);
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }
// }]);

app.controller('uploadProduct',['$scope', '$q','$injector','fileUpload', function ($scope,$q,$injector, fileUpload) {

    const CLOUD_NAME = "dgxbxvkso";
    const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    var $rootScope = $injector.get('$rootScope');
    $scope.uploadFile = function () {
        var files = Array.from($scope.myFile);
        var uploadPromises = [];
        var currentURL = window.location.href;

        files.forEach(file => {
            var rep = fileUpload.uploadFileToUrl(file, API_URL);
            uploadPromises.push(rep);
        });
        $q.all(uploadPromises).then(function (responses) {
            responses.forEach(response => {
                // Đảm bảo rằng avatar là một mảng
                if (currentURL.includes("/san-pham/new")) {
                    // Đảm bảo rằng avatar là một mảng
                    if (!$rootScope.form_product.avatar) {
                        $rootScope.form_product.avatar = [];
                    }
                    // Thêm url vào mảng avatar
                    $rootScope.form_product.avatar.push(response.secure_url);
                }else{
                    if (!$rootScope.form_product_update.avatar) {
                        $rootScope.form_product_update.avatar = [];
                    }
                    // Thêm url vào mảng avatar
                    $rootScope.form_product_update.avatar.push(response.secure_url);
                }
            });
        });
    };
}]);