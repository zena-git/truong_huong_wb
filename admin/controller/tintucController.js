app.filter('urlify', function () {
    return function (input) {
        return input.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    };
});
app.controller('tintucController',function($scope,$rootScope,$http){
    $scope.lstTinTuc = [];

    $http.get()
    .then(function(response) {
        $rootScope.lstTinTuc = response.data;
    })
    .catch(function(error) {

        console.error('Error loading data', error);
    }); 

})