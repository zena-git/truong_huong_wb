app.controller('homeController',function ($scope, $rootScope, $interval) {
    

});

app.controller('slideShow',function ($scope, $rootScope, $interval) {
    $scope.images = [
        '2.jpg',
        '1.jpg',
        '3.jpg',
        // Thêm các đường dẫn của hình ảnh khác ở đây
    ];
   
    $scope.currentIndex = 0;

    $scope.currentImage = "/assets/image/slide/"+ $scope.images[$scope.currentIndex];

    $interval(function() {
        $scope.nextImage();
    }, 2000); // Thay đổi sau mỗi giây

    $scope.nextImage = function() {
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.images.length;
        $scope.currentImage = "/assets/image/slide/"+$scope.images[$scope.currentIndex];
    };

});
