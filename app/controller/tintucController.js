app.controller('tintucController',function($scope,$http,$location){
    var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
    $scope.lstTinTuc = [];
    $http.get(url).then(function(response){
        $scope.lstTinTuc = response.data;
        console.log($scope.lstTinTuc);
    });

})