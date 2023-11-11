
app.directive('fileModel', ['$parse', 'fileUpload', function ($parse, fileUpload) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files);
          scope.uploadFile();
        });
      });
    }
  };
}]);

app.factory('fileUpload', ['$http', '$q', function ($http, $q) {
  return {
    uploadFileToUrl: function (file, url) {
      var deferred = $q.defer(); // Tạo một promise

      var formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", "upload_truonghuong");

      $http.post(url, formData, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }).then(function (response) {
        // console.log(response.data);
        deferred.resolve(response.data); // Đánh dấu promise đã hoàn thành
      }, function (error) {
        alert(error.data.error.message)
        console.error(error);
        deferred.reject(error); // Đánh dấu promise bị lỗi
      });

      return deferred.promise; // Trả về promise
    }
  };
}]);
