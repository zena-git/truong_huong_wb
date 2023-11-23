app.controller('homeController',function ($scope, $rootScope, $interval, $http) {
    var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
    $scope.lstTinTuc = [];
    $scope.lstTinTucHot = [];
  
    $http.get(url)
      .then(function (response) {
        // Lưu trữ dữ liệu vào $scope
        $scope.lstTinTuc = response.data;
        $scope.lstTinTucHot = angular.copy($scope.lstTinTuc);
        $scope.lstTinTucHot.sort(function (a, b) {
          return b.view - a.view;
        }).map(function (item) {
          // Chuyển đổi createdAt sang đối tượng Date
          var date = new Date(item.createdAt);
  
          // Lấy thông tin ngày, tháng, năm
          var day = date.getDate();
          var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
          var year = date.getFullYear();
  
          // Tạo định dạng ngày tháng năm
          var formattedDate = day + '/' + month + '/' + year;
  
          // Gán lại giá trị cho item.createdAt
          item.createdAt = formattedDate;
  
          return item;
        });
  
        initializePagination($scope.lstTinTucHot, 'pagination-container', 'data-container');
        initializePaginationMobile($scope.lstTinTucHot, 'pagination-container-mobile', 'data-container-mobile')
  
  
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  
    function initializePagination(data, containerId, dataContainerId) {
      // Số lượng mục trên mỗi trang
      var itemsPerPage = 3;
  
      // Khởi tạo pagination.js
      $('#' + containerId).pagination({
        dataSource: data,
        pageSize: itemsPerPage,
        callback: function (data, pagination) {
          // Mỗi khi trang thay đổi, cập nhật nội dung
          var html = template(data);
          $('#' + dataContainerId).html(html);
        }
      });
    }
    function initializePaginationMobile(data, containerId, dataContainerId) {
      // Số lượng mục trên mỗi trang
      var itemsPerPage = 2;
  
      // Khởi tạo pagination.js
      $('#' + containerId).pagination({
        dataSource: data,
        pageSize: itemsPerPage,
        callback: function (data, pagination) {
          // Mỗi khi trang thay đổi, cập nhật nội dung
          var html = templateMobile(data);
          $('#' + dataContainerId).html(html);
        }
      });
    }
    // Template hiển thị mục dữ liệu
    function template(data) {
      var html = '';
      $.each(data, function (index, item) {
        html += `<div class="paginationjs_box">
      
  
          <div class="card paginationjs_box-news">
          <a href="#/tin-tuc/${item.url}"> 
          <img src="${item.avatar}" class="card-img-top" alt="...">
          </a>
          <div class="card-bodys weekly2-news-active">
            <div class="weekly2-caption">
                <p>${item.createdAt}</p>
                <h4><a href="#/tin-tuc/${item.url}">${item.tile}</a></h4>
            </div>
          </div>
        </div>
            
          </div>`;
      });
      return html;
    }
    function templateMobile(data) {
      var html = '';
      $.each(data, function (index, item) {
        var truncatedTitle = truncateString(item.tile, 30);
        html += `<div class="paginationjs_box">
           <div class="card paginationjs_box-news">
           <a href="#/tin-tuc/${item.url}"> 
           <img src="${item.avatar}" class="card-img-top" alt="...">
           </a>
           <div class="card-bodys weekly2-news-active">
             <div class="weekly2-caption">
                 <p>${item.createdAt}</p>
                 <h4><a href="#/tin-tuc/${item.url}">${truncatedTitle}</a></h4>
             </div>
           </div>
         </div>
             
           </div>`;
      });
      return html;
    }
    function truncateString(str, maxLength) {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
      }
      return str;
    }

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
        $scope.currentImage = "./assets/image/slide/"+$scope.images[$scope.currentIndex];
    };

});
