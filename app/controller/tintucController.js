app.controller('tintucController', function ($scope, $http, $location, $routeParams, $window) {


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
      });

      // Gọi hàm khởi tạo pagination.js
      initializePagination();

    })
    .catch(function (error) {
      console.error('Error:', error);
    });

  function initializePagination() {
    // Số lượng mục trên mỗi trang
    var itemsPerPage = 5;

    // Khởi tạo pagination.js
    $('#pagination-container').pagination({
      dataSource: $scope.lstTinTuc,
      pageSize: itemsPerPage,
      callback: function (data, pagination) {
        // Mỗi khi trang thay đổi, cập nhật nội dung
        var html = template(data);
        $('#data-container').html(html);
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


  })

app.controller('tintucNewController', function ($scope, $http, $location, $routeParams, $window) {


  $scope.url = $routeParams.url;
  $scope.tinTuc = [];
  $http.get('https://6524c97cea560a22a4ea1a53.mockapi.io/news?url=' + $scope.url)
    .then(function (response) {
      $scope.tinTuc = response.data[0];
      $http.put('https://6524c97cea560a22a4ea1a53.mockapi.io/news/' + $scope.tinTuc.id, {
        view: $scope.tinTuc.view + 1
      })
    });

  var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
  $scope.filterTinTuc = [];
  $http.get(url)
    .then(function (response) {
      $scope.filterTinTuc = response.data.filter(function (obj) {
        return obj.url !== $scope.url;
      });

      console.log($scope.filterTinTuc);

    });

});