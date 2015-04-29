healthLineApp.controller("EnterPlayerCtrl", ["$rootScope", "$scope", "$location",
function($rootScope, $scope, $location) {
  $scope.player = {
    firstName: "",
    lastName: "",
    email: ""
  };

  $scope.save = function() {
    $rootScope.game.enterPlayerName($scope.player);

    $location.path("/rules");
  };
}]);
