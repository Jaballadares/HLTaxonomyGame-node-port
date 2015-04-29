healthLineApp.controller("RankingDetailsCtrl", ["$scope", "$http", "$location",
function($scope, $http, $location) {
  $scope.players = [];
  $scope.eventId = $location.search().event_id;
  $scope.allEvents = typeof $scope.eventId === "undefined";
  $scope.eventName = "";

  $scope.init = function() {
    _assignEventName();
    _findPlayers();
  };

  function _findPlayers() {
    $http.get("/api/players.json"+ _uriQuery())
      .success(function(data) {
        $scope.players = data;
      })
      .error(function(data) {
        console.log(data);
      });
  };

  function _assignEventName() {
    if($scope.eventId) {
      $http.get("/api/events/"+ $scope.eventId)
        .success(function(data) {
          $scope.eventName = data.name;
        })
        .error(function(data) {
          console.log("/api/events/:ID", data);
        });
    } else {
      $scope.eventName = "All Events";
    }
  };

  function _uriQuery() {
    if($scope.eventId)
      return "?event_id="+ $scope.eventId;

    return "";
  };
}]);
