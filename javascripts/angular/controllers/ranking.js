healthLineApp.controller("RankingCtrl", ["$scope", "$http", "$location",
function($scope, $http, $location) {
  $scope.events = [];

  $scope.init = function() {
    $http.get("/api/events.json")
      .success(function(data) {
        $scope.events = data;
        // SLEEP
        $("tbody.table-container").mCustomScrollbar({
          theme: "inset",
        });
      })
      .error(function(data) {
        console.log(data);
      });
  };

  $scope.goToRankingDetails = function(event) {
    $location.
      path("/ranking_details").
      search({ event_id: event.id });
  };
}]);
