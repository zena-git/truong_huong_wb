app.controller('tintucController', function ($scope, $rootScope, $http, $location, $routeParams, $window,$sce) {


  var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
  $scope.lstTinTuc = [];
  $scope.lstTinTucHot = [];

  $http.get(url)
    .then(function (response) {
      // Lưu trữ dữ liệu vào $scope
      $scope.lstTinTuc = response.data;
      $scope.lstTinTuc.sort(function (a, b) {
        // Chuyển đổi ngày thành đối tượng Date để so sánh
        var dateA = new Date(a.createdAt);
        var dateB = new Date(b.createdAt);

        // So sánh theo thứ tự giảm dần
        return dateB - dateA;
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


      // sharedDataService.setSharedData(response.data);
      $scope.lstTinTucHot = angular.copy($scope.lstTinTuc);
      $scope.lstTinTucHot.sort(function (a, b) {
        return b.view - a.view;
      });



    })
    .then(function (response) {
      // tin tức new
      $scope.lstTinTucNews = angular.copy($scope.lstTinTuc);
      // Lọc các bài viết có category là 0 từ $scope.lstTinTuc
      $scope.lstTinTucNews = $scope.lstTinTucNews.filter(function (item) {
        return item.category.includes("0");
      });

      initializePagination($scope.lstTinTucNews, 'pagination-container', 'data-container');
      initializePaginationMobile($scope.lstTinTucNews, 'pagination-container-mobile', 'data-container-mobile')

      // Doanh Nghiệp
      $scope.lstTinTucBusiness = angular.copy($scope.lstTinTuc);
      $scope.lstTinTucBusiness = $scope.lstTinTucBusiness.filter(function (item) {
        return item.category.includes("1");
      });
      initializePagination($scope.lstTinTucBusiness, 'pagination-container-business', 'data-container-business');
      initializePaginationMobile($scope.lstTinTucBusiness, 'pagination-container-mobile-business', 'data-container-mobile-business');

      // Thị Trường
      $scope.lstTinTucMarket = angular.copy($scope.lstTinTuc);
      $scope.lstTinTucMarket = $scope.lstTinTucMarket.filter(function (item) {
        return item.category.includes("2");
      });
      initializePagination($scope.lstTinTucMarket, 'pagination-container-market', 'data-container-market');
      initializePaginationMobile($scope.lstTinTucMarket, 'pagination-container-mobile-market', 'data-container-mobile-market');



      // Khuyến Mại
      $scope.lstTinTucPromotion = angular.copy($scope.lstTinTuc);
      $scope.lstTinTucPromotion = $scope.lstTinTucPromotion.filter(function (item) {
        return item.category.includes("3");
      });
      initializePagination($scope.lstTinTucPromotion, 'pagination-container-promotion', 'data-container-promotion');
      initializePaginationMobile($scope.lstTinTucPromotion, 'pagination-container-mobile-promotion', 'data-container-mobile-promotion');


    })
    .catch(function (error) {
      console.error('Error:', error);
    });
    
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }
  function initializePagination(data, containerId, dataContainerId) {
    // Số lượng mục trên mỗi trang
    var itemsPerPage = 5;
    console.log(data);
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
  function template(data) {
    var html = '';
    $.each(data, function (index, item) {
      var truncatedTitle = truncateString(item.tile, 54);
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

})
app.controller('boxNewsController', function ($scope, $http, $location, $routeParams, $window, sharedDataService) {

  // $scope.lstTinTucNews = angular.copy(sharedDataService.getSharedData());
  // console.log($scope.lstTinTucNews);
  // Gọi hàm khởi tạo pagination.js

});



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