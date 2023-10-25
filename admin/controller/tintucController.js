app.filter('urlify', function () {
    return function (input) {
        return input.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    };
});
app.controller('tintucController', function ($scope, $rootScope, $http, $location, $filter, $routeParams) {
    $scope.lstTinTuc = [];

    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news')
        .then(function (response) {
            $scope.lstTinTuc = response.data;
            console.log($scope.lstTinTuc);
        })
        .catch(function (error) {

            console.error('Error loading data', error);
        });


        
    $scope.deleteNews = function(id){
        var confirmed = window.confirm("Bạn có chắc chắn muốn xóa tin tức này?");
        if (confirmed) {
            $http.delete('https://6524c97cea560a22a4ea1a53.mockapi.io/news/'+id)
            .then(function(){
                alert("Xóa Thành Công");
                $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news')
                .then(function (response) {
                    $scope.lstTinTuc = response.data;
                })
            })
        }
    }


})


app.controller('tintucNewController', function ($scope, $http,$rootScope, $location, $filter, $routeParams) {
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

        $rootScope.news.url = encodeURIComponent( $rootScope.news.tile)+  Math.floor(Math.random() * 10000) + 1 ;
        $http.post('https://6524c97cea560a22a4ea1a53.mockapi.io/news', $scope.news)
            .then(function (response) {
                if (response.status === 201) {
                    alert("Save ok")
                    $location.path('/page/tin-tuc');
                } else {
                    alert(response.status);
                }
            })
    }

    $scope.deleteImgNews = function(index) {
        if ($rootScope.news.avatar) {
            $rootScope.news.avatar.splice(index, 1);
        }
    }

})
app.controller('tintucDetailController', function ($scope, $http,$rootScope, $location, $filter, $routeParams) {
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

        $rootScope.news.url =  $rootScope.news.tile.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        $http.put('https://6524c97cea560a22a4ea1a53.mockapi.io/news/'+ $rootScope.news.id,  $rootScope.news)
            .then(function (response) {
                if (response.status === 200) {
                    alert("Save ok")
                    $location.path('/page/tin-tuc');
                } else {
                    alert(response.status);
                }
            })
    }

    $scope.deleteImgNews = function(index) {
        if ($rootScope.news.avatar) {
            $rootScope.news.avatar.splice(index, 1);
        }
    }

})

app.controller('uploadFile',['$scope', '$q','$injector','fileUpload', function ($scope,$q,$injector, fileUpload) {

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
                if (!$rootScope.news.avatar) {
                    $rootScope.news.avatar = [];
                }
                $rootScope.news.avatar[0]=response.secure_url;
            });
        });
    };
}]);