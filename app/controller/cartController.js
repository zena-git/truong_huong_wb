app.controller('cartController', function ($scope, $rootScope, $http, $location, localStorageService) {


    $rootScope.bill = {};
    $rootScope.billDetails = [];

    $rootScope.lstCart = localStorageService.get('cart') || [];
    $rootScope.toltalAmount = 0;
    $rootScope.lstCart.forEach(element => {
        $rootScope.toltalAmount = $rootScope.toltalAmount + (element.quantity * element.product.price);

    });
})

app.controller('quatityController', function ($scope, $rootScope, $http, $location,localStorageService) {
  
    $rootScope.addQuantity = function (pro, quantity) {
        var productIndex = $rootScope.lstCart.findIndex(item => item.product.id === pro.product.id);
        $rootScope.lstCart[productIndex].quantity = parseInt($rootScope.lstCart[productIndex].quantity) + parseInt(quantity);
        if ($rootScope.lstCart[productIndex].quantity == 0) {
            $rootScope.lstCart[productIndex].quantity = 1
        }

        localStorageService.set('cart', $rootScope.lstCart)
    }


})

app.controller('addProNewCartController', function ($scope, $rootScope, $http, $location, localStorageService) {
    

    var localStorage = localStorageService.get('cart') || [];
    
    $scope.addQuantity = function(quantity, pro){

        let input_quantity = document.getElementById("input_quantity"+pro.id);
        if (quantity == -1 && input_quantity.value ==1) {
            return;
        }
        input_quantity.value = parseInt(input_quantity.value) + parseInt(quantity);
    }
  
    $scope.addCarts = function (pro) {
        let input_quantity = document.getElementById("input_quantity"+pro.id);
        var cart = {
            product: {},
            quantity: {},
        }
        $rootScope.lstCart = localStorageService.get('cart') || [];

        var productIndex = $rootScope.lstCart.findIndex(item => item.product.id === pro.id);
        console.log(productIndex);
        if (productIndex != -1) {
            console.log($rootScope.lstCart[productIndex]);
            $rootScope.lstCart[productIndex].quantity = parseInt($rootScope.lstCart[productIndex].quantity) + parseInt(input_quantity.value);
            localStorageService.set('cart', $rootScope.lstCart)
        } else {
            cart.product = pro;
            cart.quantity = input_quantity.value;
            $rootScope.lstCart.push(cart);
            localStorageService.set('cart', $rootScope.lstCart)
            $rootScope.countCart++;
        }
        input_quantity.value = 1;


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