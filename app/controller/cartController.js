app.controller('cartController', function ($scope, $rootScope, $http, $location) {

    $rootScope.countCart = 0;
    $rootScope.bill = {};
    $rootScope.billDetails = [];
    $rootScope.lstCart = [];
    // $rootScope.account.id = 72;



    $http.get('https://653b6e8f2e42fd0d54d518a5.mockapi.io/bill?idUser=1')
        .then(function (response) {
            $rootScope.bill = response.data[0];
            console.log($rootScope.bill);
            return $http.get('https://653b6e8f2e42fd0d54d518a5.mockapi.io/billDetail?idBill=' + $rootScope.bill.id);
        })
        .then(function (response) {
            $rootScope.billDetails = response.data;
            console.log($rootScope.billDetails);

            $rootScope.billDetails.forEach(function (element, index) {
                console.log(element);
                $http.get('https://63f23863f28929a9df564ecd.mockapi.io/product?id=' + element.idProduct).then(function (response) {

                    var itemCart = {
                        "billDetail": element,
                        "bill": $rootScope.bill,
                        "product": response.data[0],

                    }

                    $scope.lstCart.push(itemCart);

                })
            })

           


        });

})

app.controller('quatityController', function ($scope, $rootScope, $http, $location) {
    $scope.addQuantity = function (billDetail, quantity) {
        billDetail.quantity = billDetail.quantity + quantity;
        $http.put('https://653b6e8f2e42fd0d54d518a5.mockapi.io/billDetail/' + billDetail.id, billDetail)
    }
})

app.controller('deleteCartController', function ($scope, $rootScope, $http, $location) {
    $scope.deleteProduct = function (billDetail, index) {
        console.log(index);
        $http.delete('https://653b6e8f2e42fd0d54d518a5.mockapi.io/billDetail/' + billDetail.id)
            .then(function (response) {
                $rootScope.lstCart.splice(index, 1);
                cart();

            })
    }
})