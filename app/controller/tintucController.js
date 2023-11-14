app.controller('tintucController', function ($scope, $rootScope, $http, $location, $routeParams, $window, sharedDataService) {


  var url = "https://6524c97cea560a22a4ea1a53.mockapi.io/news";
  $rootScope.lstTinTuc = [];
  $scope.lstTinTucHot = [];

  $http.get(url)
    .then(function (response) {
      // Lưu trữ dữ liệu vào $scope
      $rootScope.lstTinTuc = response.data;
      sharedDataService.setSharedData(response.data);
      $scope.lstTinTucHot = angular.copy($rootScope.lstTinTuc);
      $scope.lstTinTucHot.sort(function (a, b) {
        return b.view - a.view;
      });
    })
    .catch(function (error) {
      console.error('Error:', error);
    });

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

app.controller('boxNewsController', function ($scope, $http, $location, $routeParams, $window,sharedDataService) {

  $scope.lstTinTucNews = 123;

  // Watch for changes in shared data
  $scope.$watch(
    function () {
      return sharedDataService.getSharedData();
    },
    function (newData) {
      if (newData && newData.length > 0) {
        // Dữ liệu đã có, gán vào $scope.lstTinTucNews và khởi tạo pagination
  
        $scope.lstTinTucNews = angular.copy(newData);
        console.log($scope.lstTinTucNews);
        $scope.lstTinTucNews.forEach(element => {
          console.log(element);
        });
        initializePagination($scope.lstTinTucNews);
        initializePaginationMobile($scope.lstTinTucNews);
      }
    }
  );
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }
  function initializePagination(data) {
    // Số lượng mục trên mỗi trang
    var itemsPerPage = 5;

    // Khởi tạo pagination.js
    $('#pagination-container').pagination({
      dataSource: data,
      pageSize: itemsPerPage,
      callback: function (data, pagination) {
        // Mỗi khi trang thay đổi, cập nhật nội dung
        var html = template(data);
        $('#data-container').html(html);
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

  function initializePaginationMobile(data) {
    // Số lượng mục trên mỗi trang
    var itemsPerPage = 2;

    // Khởi tạo pagination.js
    $('#pagination-container-mobile').pagination({
      dataSource: data,
      pageSize: itemsPerPage,
      callback: function (data, pagination) {
        // Mỗi khi trang thay đổi, cập nhật nội dung
        var html = templateMobile(data);
        $('#data-container-mobile').html(html);
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

});

app.controller('boxBusinessController', function ($scope, $http, $location, $routeParams, $window,sharedDataService) {

  $scope.lstTinTucNews = 123;

  // Watch for changes in shared data
  $scope.$watch(
    function () {
      return sharedDataService.getSharedData();
    },
    function (newData) {
      if (newData && newData.length > 0) {
        // Dữ liệu đã có, gán vào $scope.lstTinTucNews và khởi tạo pagination
  
        $scope.lstTinTucNews = angular.copy(newData);
        console.log($scope.lstTinTucNews);
        $scope.lstTinTucNews.forEach(element => {
          console.log(element);
        });
        initializePagination($scope.lstTinTucNews);
        initializePaginationMobile($scope.lstTinTucNews);
      }
    }
  );
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }
  function initializePagination(data) {
    // Số lượng mục trên mỗi trang
    var itemsPerPage = 5;

    // Khởi tạo pagination.js
    $('#pagination-container-business').pagination({
      dataSource: data,
      pageSize: itemsPerPage,
      callback: function (data, pagination) {
        // Mỗi khi trang thay đổi, cập nhật nội dung
        var html = template(data);
        $('#data-container').html(html);
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

  function initializePaginationMobile(data) {
    // Số lượng mục trên mỗi trang
    var itemsPerPage = 2;

    // Khởi tạo pagination.js
    $('#pagination-container-mobile-business').pagination({
      dataSource: data,
      pageSize: itemsPerPage,
      callback: function (data, pagination) {
        // Mỗi khi trang thay đổi, cập nhật nội dung
        var html = templateMobile(data);
        $('#data-container-mobile-business').html(html);
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

});

