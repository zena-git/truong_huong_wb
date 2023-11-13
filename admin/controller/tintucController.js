
app.controller('tintucController', function ($scope, $rootScope, $http, $location, $filter, $routeParams) {
    $scope.lstTinTuc = [];

    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news')
        .then(function (response) {
            $scope.lstTinTuc = response.data;
            console.log($scope.lstTinTuc);
        })
        .then(function (response) {
            // Khởi tạo DataTables sau khi dữ liệu đã được tải
            angular.element(document).ready(function () {
                $('#table_product').DataTable();

            });

        })
        .catch(function (error) {

            console.error('Error loading data', error);
        });



    $scope.deleteNews = function (id) {
        var confirmed = window.confirm("Bạn có chắc chắn muốn xóa tin tức này?");
        if (confirmed) {
            $http.delete('https://6524c97cea560a22a4ea1a53.mockapi.io/news/' + id)
                .then(function () {
                    alert("Xóa Thành Công");
                    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news')
                        .then(function (response) {
                            $scope.lstTinTuc = response.data;
                        })
                })
        }
    }


})


app.controller('tintucNewController', function ($scope, $http, $rootScope, $location, $filter, $routeParams, SlugService) {
    $scope.url = $routeParams.url;

    $rootScope.news = {
        createdAt: new Date(),
        tile: "",
        avatar: [
        ],
        url: "",
        dec: ""
    }
    $scope.saveNews = function () {

        $rootScope.news.url = SlugService.convertToSlug($rootScope.news.tile) + Math.floor(Math.random() * 10000) + 1;
        $http.post('https://6524c97cea560a22a4ea1a53.mockapi.io/news', $scope.news)
            .then(function (response) {
                if (response.status === 201) {
                    alert("Save ok")
                    $location.path('/tin-tuc');
                } else {
                    alert(response.status);
                }
            })
    }

    $scope.deleteImgNews = function (index) {
        if ($rootScope.news.avatar) {
            $rootScope.news.avatar.splice(index, 1);
        }
    }

})
app.controller('tintucDetailController', function ($scope, $http, $rootScope, $location, $filter, $routeParams, SlugService) {
    $scope.url = $routeParams.url;

    $rootScope.news = {
        createdAt: new Date(),
        tile: "",
        avatar: [
        ],
        url: "",
        dec: ""
    }
    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news?url=' + $scope.url)
        .then(function (response) {
            $rootScope.news = response.data[0];

        });
    $scope.saveNews = function () {
        $rootScope.news.url = SlugService.convertToSlug($rootScope.news.tile) + Math.floor(Math.random() * 10000) + 1;
        $http.put('https://6524c97cea560a22a4ea1a53.mockapi.io/news/' + $rootScope.news.id, $rootScope.news)
            .then(function (response) {
                if (response.status === 200) {
                    alert("Save ok")
                    $location.path('/tin-tuc');
                } else {
                    alert(response.status);
                }
            })
    }

    $scope.deleteImgNews = function (index) {
        if ($rootScope.news.avatar) {
            $rootScope.news.avatar.splice(index, 1);
        }
    }

})

app.controller('uploadFile', ['$scope', '$q', '$injector', 'fileUpload', function ($scope, $q, $injector, fileUpload) {

    const CLOUD_NAME = "dgxbxvkso";
    const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`;
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
                if (!$rootScope.news.avatar) {
                    $rootScope.news.avatar = [];
                }
                var imagePath = response.secure_url;
                // Chuỗi cần thêm vào sau phần "upload"
                var additionalParams = 'w_240,h_160';

                // Tìm vị trí của "/upload" trong đường dẫn
                var uploadIndex = imagePath.indexOf('/upload');

                // Kiểm tra nếu "/upload" không được tìm thấy
                if (uploadIndex !== -1) {
                    // Chia đường dẫn thành hai phần: trước và sau "/upload"
                    var pathBeforeUpload = imagePath.slice(0, uploadIndex + 7);
                    var pathAfterUpload = imagePath.slice(uploadIndex + 7);

                    // Tạo đường dẫn mới bằng cách ghép phần trước, chuỗi mới và phần sau
                    var newImagePath = pathBeforeUpload + '/' + additionalParams + pathAfterUpload;

                    $rootScope.news.avatar[0] = newImagePath;
                }
                console.log(response);
                
            });
        });
    };
}]);