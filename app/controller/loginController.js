app.controller('loginController', function ($scope,$location , $rootScope, $http, $window) {
    $scope.form_login = {
        username: '',
        password: ''
    }
    $rootScope.account = {
        id: 1,
        username: "admin",
        password: "admin"
    };

    $scope.login = function () {
        event.preventDefault();
        console.log($scope.form_login.username);
        $http.get('https://63f23863f28929a9df564ecd.mockapi.io/account?username=' + $scope.form_login.username).then(function (response) {
            var getUser = response.data;
            console.log(getUser);
            if (getUser.length != 0) {
                if (getUser[0].password == $scope.form_login.password) {
                    alert("Đăng Nhập Thành Công")
                    var protocol = $location.protocol();
                    var host = $location.host();
                    var newURL = protocol + '://' + host +'/admin/';
                    $window.location.href = newURL;
                    // $scope.currentURL =  $location.host();
                    // $window.location.href = $scope.currentURL +'/admin'; // Đổi '/new-page.html' thành URL bạn muốn chuyển hướng đến
                    // $location.path('/admin');
                } else {
                    alert("Sai Password\nPassword của bạn phải là: " + getUser[0].password)
                }
            } else {
                alert("Không Tìm Thấy User")
            }
        })
    }

})