app.controller('cartController', function ($scope, $rootScope, $http, $location, localStorageService) {


    $rootScope.bill = {};
    $rootScope.billDetails = [];

    $rootScope.lstCart = localStorageService.get('cart') || [];
    $rootScope.toltalAmount = 0;
    $rootScope.lstCart.forEach(element => {
        $rootScope.toltalAmount = $rootScope.toltalAmount + (element.quantity * element.product.price);

    });
})

app.controller('quatityController', function ($scope, $rootScope, $http, $location) {
    $rootScope.addQuantity = function (pro, quantity) {
        var productIndex = $rootScope.lstCart.findIndex(item => item.product.id === pro.product.id);
        $rootScope.lstCart[productIndex].quantity = parseInt($rootScope.lstCart[productIndex].quantity) + parseInt(quantity);
        if ($rootScope.lstCart[productIndex].quantity == 0) {
            $rootScope.lstCart[productIndex].quantity = 1
        }
        localStorageService.set('cart', $rootScope.lstCart)
    }


})

app.controller('deleteCartController', function ($scope, $rootScope, $http, $location, localStorageService) {
    $scope.deleteProduct = function (billDetail, index) {
        $rootScope.lstCart.splice(index, 1);
        localStorageService.set('cart', $rootScope.lstCart)
        $rootScope.countCart--;

    }
})

app.controller('buyCartController', function ($scope, $rootScope, $http, $location, localStorageService) {

    $scope.form_customer = {
        name: "",
        phone: "",
        email: "",
        tinh: "",
        huyen: "",
        xa: "",
        diaChi: "",
        ghiChu: "",
    }

    $scope.form_customer_validate = {
        name: false,
        phone: false,
        diaChi: false,

    }

    var temp = true;
    var lstPro = localStorageService.get('cart');
    $scope.buyProduct = function () {
        var data = {
            customer: $scope.form_customer,
            product: lstPro
        }

        // Đặt mặc định temp là true
        temp = true;

        // Kiểm tra các trường xác thực
        if (!$scope.form_customer.name) {
            $scope.form_customer_validate.name = true;
            temp = false;
        } else {
            $scope.form_customer_validate.name = false;
        }

        if (!$scope.form_customer.phone && !/^\d{10}$/.test($scope.form_customer.phone)) {
            $scope.form_customer_validate.phone = true;
            temp = false;
        } else {
            $scope.form_customer_validate.phone = false;
        }

        if (!$scope.form_customer.diaChi) {
            $scope.form_customer_validate.diaChi = true;
            temp = false;
        } else {
            $scope.form_customer_validate.diaChi = false;
        }
        if (temp) {
            $http.post('https://65420720f0b8287df1ff59f4.mockapi.io/oder', data)
            .then(function (response) {
                localStorageService.set('cart', []);
                alert('Đặt Hàng Thành Công \nChúng tôi sẽ liên hệ lại vs bạn trong thời gian tới');
                $rootScope.countCart = 0;
                $location.path('/');
            })
        }
        

    }
});