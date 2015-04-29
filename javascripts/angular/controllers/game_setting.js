healthLineApp.controller("GameSettingCtrl", ["$rootScope", "$scope", "$http", "$location",
function($rootScope, $scope, $http, $location) {
  $scope.init = function() {
    $scope.event = angular.copy($rootScope.game.event);
  };

  $scope.save = function() {
    var event_date = $scope.event.event_date.split("/");
    $scope.event.event_date = [event_date[2], event_date[0], event_date[1]].join("/");
    $http.post("/api/events.json", $scope.event)
      .success(function(data) {
        $rootScope.game.event.update(data);
        $location.path("/home");
      })
      .error(function(data) {
        console.log("/api/events.json", data);
      });
  };

  $scope.previewCountdownOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  $scope.gameTimeLimitOptions = [1, 2, 3, 4, 5];
}]);
