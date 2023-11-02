app.controller('cartController', function ($scope, $rootScope, $http, $location,localStorageService) {


    $rootScope.bill = {};
    $rootScope.billDetails = [];

    $rootScope.lstCart = localStorageService.get('cart') || [];
    $rootScope.toltalAmount = 0;
    $rootScope.lstCart.forEach(element => {
        $rootScope.toltalAmount = $rootScope.toltalAmount + (element.quantity*element.product.price);
       
    });
})

app.controller('quatityController', function ($scope, $rootScope, $http, $location) {
    $rootScope.addQuantity = function (pro, quantity) {
        var productIndex =  $rootScope.lstCart.findIndex(item => item.product.id === pro.product.id);
        $rootScope.lstCart[productIndex].quantity = parseInt($rootScope.lstCart[productIndex].quantity) + parseInt(quantity);
        if ($rootScope.lstCart[productIndex].quantity == 0) {
            $rootScope.lstCart[productIndex].quantity = 1
        }
        localStorageService.set('cart',$rootScope.lstCart)
    }


})

app.controller('deleteCartController', function ($scope, $rootScope, $http, $location,localStorageService) {
    $scope.deleteProduct = function (billDetail, index) {
        $rootScope.lstCart.splice(index, 1);
        localStorageService.set('cart',$rootScope.lstCart )
        $rootScope.countCart --;

    }
})

app.controller('buyCartController', function ($scope, $rootScope, $http, $location,localStorageService){

    $scope.form_customer = {
        name: "",
        phone: "",
        email:"",
        tinh: "",
        huyen: "",
        xa: "", 
        diaChi: "",
        ghiChu: "",
    }

    var lstPro = localStorageService.get('cart');
    $scope.buyProduct = function (){
        var data = {
            customer: $scope.form_customer,
            product: lstPro
        }

        console.log(data);
        $http.post('https://65420720f0b8287df1ff59f4.mockapi.io/oder', data)
        .then(function (response){
           localStorageService.set('cart',[]);
           alert('Đặt Hàng Thành Công')
           $location.path('/');
        })
            
    }
});