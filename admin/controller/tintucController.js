app.filter('urlify', function () {
    return function (input) {
        return input.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    };
});
app.controller('tintucController', function ($scope, $rootScope, $http,$location,$filter, $routeParams) {
    $scope.lstTinTuc = [];

    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news')
        .then(function (response) {
            $scope.lstTinTuc = response.data;
            console.log($scope.lstTinTuc);
        })
        .catch(function (error) {

            console.error('Error loading data', error);
        });

    $scope.news = {
        createdAt: new Date(),
        tile: "",
        avatar: [
        ],
        url: "",
        dec: ""
    }
    $scope.urlNew = "";

    $scope.addNew = function(){
        $scope.news.url = $filter('urlify')($scope.urlNew);
        console.log($scope.news);
        $http.post('https://6524c97cea560a22a4ea1a53.mockapi.io/news', $scope.news)
        .then(function (response) {
            if (response.status === 201) {
                $location.path('/page/tin-tuc/'+$scope.news.url);
            }
        })
    }



})


app.controller('tintucNewController', function ($scope, $http,$location,$filter, $routeParams){
    $scope.url = $routeParams.url;
    $scope.tinTuc = {};
    $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news?url='+$scope.url)
    .then(function(response){
        $scope.tinTuc = response.data[0];
        console.log($scope.tinTuc);      
    });

    $scope.inputUrlImg = "";
    $scope.defaultImg = "../../assets/image/news/c730a76ad3921d3c947f43a77f8c7499.jpg";
    if ($scope.tinTuc.avatar != "") {
        $scope.inputUrlImg = $scope.tinTuc.avatar;
    }
    $scope.saveNews = function(){
        var userConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?");
        if ($scope.inputUrlImg === undefined) {
            $scope.tinTuc.avatar = $scope.defaultImg;
        }else{
            $scope.tinTuc.avatar = $scope.inputUrlImg;

        }
        console.log($scope.tinTuc.avatar);
        if (userConfirmed) {
            $http.put('https://6524c97cea560a22a4ea1a53.mockapi.io/news/'+ $scope.tinTuc.id,$scope.tinTuc )
        .then(function(response){
         
            if (response.status === 200) {
                alert("Save ok")
                $location.path('/page/tin-tuc');
            }else{
                alert(response.status);
            }
        })
        }
        
    }

})