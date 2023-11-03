app.controller('orderController', function ($scope, $rootScope, $http, $location, $routeParams) {
    $scope.lstOder = [];
  
    var url = "https://65420720f0b8287df1ff59f4.mockapi.io/oder";
    $http.get(url).then(function (response) {
        $scope.lstOder = response.data;
        console.log($scope.lstOder);
    });
    $scope.deleteOrder = function (id,index) {
       
      
        $http.delete('https://65420720f0b8287df1ff59f4.mockapi.io/oder/' + id).then(function (response){
            $http.get(url).then(function (response) {
                $scope.lstOder = response.data;
                console.log($scope.lstOder);
            });    
    })

    };

});

app.controller('orderDetailController', function ($scope, $rootScope, $http, $location, $routeParams) {
    $scope.order = {};
    var id = $routeParams.idOder;
    $scope.toltalAmount = 0;
    var url = "https://65420720f0b8287df1ff59f4.mockapi.io/oder/" + id;
    $http.get(url).then(function (response) {
        $scope.order = response.data;
        $scope.order.product.forEach(element => {
            $scope.toltalAmount = $scope.toltalAmount + (element.quantity*element.product.price);
           
        });
    });


    

});